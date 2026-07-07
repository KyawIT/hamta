import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideClock, LucideMapPin, LucidePhone, LucideSend, LucideTruck } from '@lucide/angular';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

export function buildMailto(name: string, email: string, message: string): string {
  const subject = encodeURIComponent(`Anfrage von ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`);
  return `mailto:info@hamtarestaurant.at?subject=${subject}&body=${body}`;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, FadeInDirective, SectionLabelComponent, LucideClock, LucideMapPin, LucidePhone, LucideSend, LucideTruck],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly sent = signal(false);
  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, message } = this.form.getRawValue();
    this.sent.set(true);
    if (this.isBrowser) window.location.href = buildMailto(name, email, message);
  }
}
