import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArtworksComponent } from './featured-artworks.component';

describe('FeaturedArtworksComponent', () => {
  let component: FeaturedArtworksComponent;
  let fixture: ComponentFixture<FeaturedArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
