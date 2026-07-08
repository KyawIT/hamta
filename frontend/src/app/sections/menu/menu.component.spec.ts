import { TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  it('switches menu categories', async () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Beef Tatar (120 g)');

    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    buttons.find((button) => button.textContent?.trim() === 'Pizza')?.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Burrata e Crudo');
    expect(fixture.nativeElement.textContent).not.toContain('Beef Tatar (120 g)');
  });
});
