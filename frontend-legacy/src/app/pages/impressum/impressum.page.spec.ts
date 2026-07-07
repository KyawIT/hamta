import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ImpressumPage } from './impressum.page';

describe('ImpressumPage', () => {
  it('creates', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    expect(TestBed.createComponent(ImpressumPage).componentInstance).toBeTruthy();
  });
});
