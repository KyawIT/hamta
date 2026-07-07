import { TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  it('switches menu categories', async () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Lammkebap (Dürum)');

    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    buttons.find((button) => button.textContent?.includes('Grill & Fleisch'))?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeTab()).toBe('grill');
    expect(fixture.nativeElement.textContent).toContain('Lammkotelett');
    expect(fixture.nativeElement.textContent).not.toContain('Lammkebap (Dürum)');
  });
});
