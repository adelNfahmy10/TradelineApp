import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EasyPayPage } from './easy-pay.page';

describe('EasyPayPage', () => {
  let component: EasyPayPage;
  let fixture: ComponentFixture<EasyPayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
