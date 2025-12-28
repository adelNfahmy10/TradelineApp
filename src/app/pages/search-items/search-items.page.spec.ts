import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchItemsPage } from './search-items.page';

describe('SearchItemsPage', () => {
  let component: SearchItemsPage;
  let fixture: ComponentFixture<SearchItemsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
