import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuBoardComponent } from '../../shared/menu-board/menu-board.component';
import { PublicMenuService } from '../../shared/public-menu.service';

@Component({
  selector: 'app-drinks-section',
  imports: [MenuBoardComponent],
  template: `
    <app-menu-board
      sectionId="getraenke"
      bgImage="/assets/Image14.jpeg"
      surface="#141013"
      eyebrow="Unsere Getränkekarte"
      headingBefore="Zum"
      headingEmphasis="Anstoßen"
      intro="Aperitifs, Cocktails und Klassiker aus der Bar, dazu Kaffee, hausgemachte Limonaden und erfrischende Softdrinks. Die Auswahl kann saisonal variieren."
      [categories]="categories()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrinksComponent {
  private readonly menu = inject(PublicMenuService);
  readonly categories = this.menu.drinkCategories;
}
