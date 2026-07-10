import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuBoardComponent } from '../../shared/menu-board/menu-board.component';
import { PublicMenuService } from '../../shared/public-menu.service';

export type { MenuItem, MenuCategory } from '../../shared/menu-board/menu-board.component';

@Component({
  selector: 'app-menu-section',
  imports: [MenuBoardComponent],
  template: `
    <app-menu-board
      sectionId="menu"
      bgImage="/assets/Image10.jpeg"
      surface="#0e0e0e"
      eyebrow="Unsere Speisekarte"
      headingBefore="Klassiker, die"
      headingEmphasis="bleiben"
      intro="Von Vorspeisen und Steaks über Hauptspeisen und Pizza bis zu Suppen, Beilagen und Desserts. Die folgende Auswahl dient als Beispielkarte und kann saisonal variieren."
      [categories]="categories()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private readonly menu = inject(PublicMenuService);
  readonly categories = this.menu.dishCategories;
}
