import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  it('creates', () => {
    expect(TestBed.createComponent(HeroComponent).componentInstance).toBeTruthy();
  });
});
