import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-legal-page-header',
  imports: [RouterLink],
  templateUrl: './legal-page-header.component.html',
  styleUrl: './legal-page-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalPageHeaderComponent {}
