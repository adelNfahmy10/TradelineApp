import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvcDetailsPage } from './tvc-details.page';

describe('TvcDetailsPage', () => {
  let component: TvcDetailsPage;
  let fixture: ComponentFixture<TvcDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TvcDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
