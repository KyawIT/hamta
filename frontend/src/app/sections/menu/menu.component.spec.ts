import { TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  it('switches menu categories', async () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Bruschetta al Pomodoro');

    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    buttons.find((button) => button.textContent?.includes('Pasta'))?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeTab()).toBe('pasta');
    expect(fixture.nativeElement.textContent).toContain('Tagliatelle al Ragù');
    expect(fixture.nativeElement.textContent).not.toContain('Bruschetta al Pomodoro');
  });
});
