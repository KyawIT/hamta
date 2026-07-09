import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideCalendarCheck,
  LucideChevronRight,
  LucideImages,
  LucideUtensilsCrossed,
} from '@lucide/angular';

import { GalleryService, MAX_GALLERY_IMAGES } from '../../gallery/gallery.service';
import { MenuAdminService } from '../../menu/menu-admin.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, LucideCalendarCheck, LucideChevronRight, LucideImages, LucideUtensilsCrossed],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private readonly menu = inject(MenuAdminService);
  private readonly gallery = inject(GalleryService);

  readonly dishCount = this.menu.dishes;
  readonly galleryCount = this.gallery.count;
  readonly maxGallery = MAX_GALLERY_IMAGES;
}
