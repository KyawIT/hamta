import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-section-label',
  templateUrl: './section-label.component.html',
  styleUrl: './section-label.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionLabelComponent {}
