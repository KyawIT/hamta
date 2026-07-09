import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

export interface TeamMember {
  role: string;
  image: string | null;
  featured: boolean;
}

@Component({
  selector: 'app-team',
  imports: [FadeInDirective, SectionLabelComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  readonly members: TeamMember[] = [
    { role: 'Koch', image: null, featured: false },
    { role: 'Besitzer', image: '/assets/owner.png', featured: true },
    { role: 'Koch', image: null, featured: false },
  ];
}
