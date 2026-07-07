import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LegalPageHeaderComponent } from './legal-page-header.component';

describe('LegalPageHeaderComponent', () => {
  it('creates', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    expect(TestBed.createComponent(LegalPageHeaderComponent).componentInstance).toBeTruthy();
  });
});
