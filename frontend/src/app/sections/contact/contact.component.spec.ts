import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildMailto, ContactComponent } from './contact.component';

describe('buildMailto', () => {
  it('encodes all submitted contact fields', () => {
    const result = buildMailto('Ada Lovelace', 'ada@example.at', 'Tisch für 4, bitte.');
    expect(result).toContain('mailto:info@hamtarestaurant.at');
    expect(decodeURIComponent(result)).toContain('Anfrage von Ada Lovelace');
    expect(decodeURIComponent(result)).toContain('E-Mail: ada@example.at');
    expect(decodeURIComponent(result)).toContain('Tisch für 4, bitte.');
  });

  it('shows the success state after a valid submission', () => {
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.componentInstance.form.setValue({
      name: 'Ada Lovelace',
      email: 'ada@example.at',
      message: 'Reservierung',
    });
    fixture.componentInstance.submit();
    fixture.detectChanges();

    expect(fixture.componentInstance.sent()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Nachricht wird geöffnet');
  });
});
