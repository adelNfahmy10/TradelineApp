import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PremuimPage } from './premuim.page';

describe('PremuimPage', () => {
  let component: PremuimPage;
  let fixture: ComponentFixture<PremuimPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PremuimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
