import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

const KEYCLOAK_URL = 'http://localhost:8081';
const REALM = 'hamta';
const CLIENT_ID = 'hamta-admin';
const TOKEN_STORAGE_KEY = 'hamta.keycloak.tokens';
const LOGIN_STATE_KEY = 'hamta.keycloak.login-state';
const CODE_VERIFIER_KEY = 'hamta.keycloak.code-verifier';

interface TokenResponse {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
  expires_in: number;
}

interface StoredTokens extends TokenResponse {
  expires_at: number;
}

/** Authentication for the admin app using Keycloak's Authorization Code flow with PKCE. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  /** Rechecks expiry whenever a route guard asks for the authentication state. */
  isAuthenticated(): boolean {
    return this.hasValidStoredTokens();
  }

  /** Returns the current bearer token for backend API calls, if it is still valid. */
  accessToken(): string | null {
    const tokens = this.readTokens();
    return tokens && tokens.expires_at > Date.now() ? tokens.access_token : null;
  }

  /** Redirects to Keycloak; credentials are entered only on Keycloak's hosted login page. */
  login(): void {
    if (!this.isBrowser) return;

    const state = this.randomUrlSafeValue();
    const verifier = this.randomUrlSafeValue();
    sessionStorage.setItem(LOGIN_STATE_KEY, state);
    sessionStorage.setItem(CODE_VERIFIER_KEY, verifier);

    void this.sha256(verifier).then((challenge) => {
      const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: this.redirectUri,
        response_type: 'code',
        scope: 'openid profile email',
        state,
        code_challenge: challenge,
        code_challenge_method: 'S256',
      });
      window.location.assign(`${this.realmUrl}/protocol/openid-connect/auth?${params}`);
    });
  }

  /** Completes Keycloak's redirect. Returns an error suitable for the login page, if any. */
  async completeLogin(): Promise<string | null> {
    if (!this.isBrowser) return null;

    const url = new URL(window.location.href);
    const providerError = url.searchParams.get('error');
    const code = url.searchParams.get('code');
    if (!providerError && !code) return null;

    const receivedState = url.searchParams.get('state');
    const expectedState = sessionStorage.getItem(LOGIN_STATE_KEY);
    const verifier = sessionStorage.getItem(CODE_VERIFIER_KEY);
    this.clearLoginAttempt();
    window.history.replaceState({}, document.title, '/admin/login');

    if (providerError) return 'Die Anmeldung bei Keycloak wurde abgebrochen oder abgelehnt.';
    if (!code || !receivedState || receivedState !== expectedState || !verifier) {
      return 'Die Anmeldeantwort konnte nicht überprüft werden. Bitte erneut versuchen.';
    }

    try {
      const response = await fetch(`${this.realmUrl}/protocol/openid-connect/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
          code,
          redirect_uri: this.redirectUri,
          code_verifier: verifier,
        }),
      });
      if (!response.ok) throw new Error('Token exchange failed');

      const tokens = (await response.json()) as TokenResponse;
      this.storeTokens(tokens);
      return null;
    } catch {
      return 'Keycloak konnte die Anmeldung nicht abschließen. Bitte erneut versuchen.';
    }
  }

  logout(): void {
    const tokens = this.readTokens();
    this.clearTokens();
    if (!this.isBrowser) return;

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      post_logout_redirect_uri: `${window.location.origin}/admin/login`,
    });
    if (tokens?.id_token) params.set('id_token_hint', tokens.id_token);
    window.location.assign(`${this.realmUrl}/protocol/openid-connect/logout?${params}`);
  }

  private get realmUrl(): string {
    return `${KEYCLOAK_URL}/realms/${REALM}`;
  }

  private get redirectUri(): string {
    return `${window.location.origin}/admin/login`;
  }

  private storeTokens(response: TokenResponse): void {
    const tokens: StoredTokens = {
      ...response,
      expires_at: Date.now() + response.expires_in * 1000,
    };
    sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
  }

  private hasValidStoredTokens(): boolean {
    const tokens = this.readTokens();
    return !!tokens && tokens.expires_at > Date.now();
  }

  private readTokens(): StoredTokens | null {
    if (!this.isBrowser) return null;
    try {
      const value = sessionStorage.getItem(TOKEN_STORAGE_KEY);
      return value ? (JSON.parse(value) as StoredTokens) : null;
    } catch {
      return null;
    }
  }

  private clearTokens(): void {
    if (this.isBrowser) sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  private clearLoginAttempt(): void {
    sessionStorage.removeItem(LOGIN_STATE_KEY);
    sessionStorage.removeItem(CODE_VERIFIER_KEY);
  }

  private randomUrlSafeValue(): string {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return this.base64Url(bytes);
  }

  private async sha256(value: string): Promise<string> {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return this.base64Url(new Uint8Array(hash));
  }

  private base64Url(bytes: Uint8Array): string {
    let binary = '';
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}
