import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('application routes', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  it(
    'renders the home route',
    async () => {
      const harness = await RouterTestingHarness.create('/');
      expect(harness.routeNativeElement?.querySelector('#start')).toBeTruthy();
      expect(harness.routeNativeElement?.textContent).toContain('Hamta');
    },
    10_000,
  );

  it('renders both legal routes', async () => {
    const harness = await RouterTestingHarness.create('/impressum');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Impressum');
    await harness.navigateByUrl('/datenschutz');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Datenschutzerklärung');
  });
});
