import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VrstorePage } from './vrstore.page';

describe('VrstorePage', () => {
  let component: VrstorePage;
  let fixture: ComponentFixture<VrstorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VrstorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
