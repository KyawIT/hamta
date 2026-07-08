import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  LucideCalendarCheck,
  LucideLayoutDashboard,
  LucidePanelLeft,
  LucideSettings,
  LucideUtensilsCrossed,
} from '@lucide/angular';

@Component({
  selector: 'app-admin-shell',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    LucideCalendarCheck,
    LucideLayoutDashboard,
    LucidePanelLeft,
    LucideSettings,
    LucideUtensilsCrossed,
  ],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShell implements OnInit, OnDestroy {
  readonly sidebarOpen = signal(false);

  private readonly meta = inject(Meta);
  private previousRobots: string | null = null;

  ngOnInit(): void {
    // Admin darf nie in Suchmaschinen landen.
    this.previousRobots = this.meta.getTag('name="robots"')?.content ?? null;
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  ngOnDestroy(): void {
    if (this.previousRobots) {
      this.meta.updateTag({ name: 'robots', content: this.previousRobots });
    } else {
      this.meta.removeTag('name="robots"');
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
