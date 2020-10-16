import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterArtworksComponent } from './filter-artworks.component';

describe('FilterArtworksComponent', () => {
  let component: FilterArtworksComponent;
  let fixture: ComponentFixture<FilterArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
