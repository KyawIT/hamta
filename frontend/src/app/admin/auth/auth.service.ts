import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

const STORAGE_KEY = 'hamta_admin_auth';

/**
 * Platzhalter-Authentifizierung.
 *
 * Die öffentliche API (isAuthenticated / login / logout) bleibt stabil –
 * später wird die Fake-Logik hier innen 1:1 durch Keycloak ersetzt,
 * ohne dass Guard, Login-Screen oder Shell sich ändern müssen.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly loggedIn = signal(this.readStoredState());

  readonly isAuthenticated = this.loggedIn.asReadonly();

  login(username: string, password: string): boolean {
    // TODO: gegen Keycloak ersetzen. Vorerst reiner Platzhalter.
    if (!username.trim() || !password.trim()) {
      return false;
    }
    this.setState(true);
    return true;
  }

  logout(): void {
    this.setState(false);
  }

  private setState(value: boolean): void {
    this.loggedIn.set(value);
    if (!this.isBrowser) return;
    if (value) {
      localStorage.setItem(STORAGE_KEY, '1');
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private readStoredState(): boolean {
    if (!this.isBrowser) return false;
    return localStorage.getItem(STORAGE_KEY) === '1';
  }
}
