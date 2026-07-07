import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideExternalLink } from '@lucide/angular';
import { ExternalScriptService } from '../../core/external-script.service';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

interface InstagramWindow extends Window {
  instgrm?: { Embeds: { process(): void } };
}

@Component({
  selector: 'app-social',
  imports: [FadeInDirective, SectionLabelComponent, LucideExternalLink],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialComponent {
  private readonly scripts = inject(ExternalScriptService);

  constructor() {
    afterNextRender(() => {
      void this.scripts.load('instagram-embed', 'https://www.instagram.com/embed.js')
        .then(() => (window as InstagramWindow).instgrm?.Embeds.process())
        .catch(() => undefined);
      void this.scripts.load('tiktok-embed', 'https://www.tiktok.com/embed.js').catch(() => undefined);
    });
  }
}
