import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideLoaderCircle, LucideLock } from '@lucide/angular';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, LucideLoaderCircle, LucideLock],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  readonly username = signal('');
  readonly password = signal('');
  readonly error = signal('');
  readonly submitting = signal(false);

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  submit(): void {
    if (this.submitting()) return;
    this.error.set('');

    if (!this.username().trim() || !this.password().trim()) {
      this.error.set('Bitte Benutzername und Passwort eingeben.');
      return;
    }

    this.submitting.set(true);
    // Kleiner künstlicher Delay, damit sich der Login echt anfühlt.
    // Wird später durch den echten Keycloak-Request ersetzt.
    setTimeout(() => {
      const ok = this.auth.login(this.username(), this.password());
      if (ok) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.error.set('Anmeldung fehlgeschlagen.');
        this.submitting.set(false);
      }
    }, 500);
  }
}
