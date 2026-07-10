import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideLoaderCircle, LucideLock } from '@lucide/angular';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [LucideLoaderCircle, LucideLock],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  readonly error = signal('');
  readonly submitting = signal(false);

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  async ngOnInit(): Promise<void> {
    const error = await this.auth.completeLogin();
    if (error) {
      this.error.set(error);
    } else if (this.auth.isAuthenticated()) {
      await this.router.navigate(['/admin/dashboard']);
    }
  }

  login(): void {
    if (this.submitting()) return;
    this.submitting.set(true);
    this.auth.login();
  }
}
