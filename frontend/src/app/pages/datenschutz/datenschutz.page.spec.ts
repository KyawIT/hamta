import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DatenschutzPage } from './datenschutz.page';

describe('DatenschutzPage', () => {
  it('creates', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    expect(TestBed.createComponent(DatenschutzPage).componentInstance).toBeTruthy();
  });
});
