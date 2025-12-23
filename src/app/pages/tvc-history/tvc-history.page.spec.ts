import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvcHistoryPage } from './tvc-history.page';

describe('TvcHistoryPage', () => {
  let component: TvcHistoryPage;
  let fixture: ComponentFixture<TvcHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TvcHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
