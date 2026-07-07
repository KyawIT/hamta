import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  it('opens and closes the mobile menu while locking document scroll', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    fixture.componentInstance.toggleMobile();
    fixture.detectChanges();
    expect(fixture.componentInstance.mobileOpen()).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    expect(fixture.nativeElement.querySelector('#mobile-menu')).toBeTruthy();

    fixture.componentInstance.closeMobile();
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('');
  });
});
