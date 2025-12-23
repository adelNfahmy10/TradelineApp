import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NearbystorePage } from './nearbystore.page';

describe('NearbystorePage', () => {
  let component: NearbystorePage;
  let fixture: ComponentFixture<NearbystorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbystorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
