import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoredArtworksComponent } from './scored-artworks.component';

describe('ScoredArtworksComponent', () => {
  let component: ScoredArtworksComponent;
  let fixture: ComponentFixture<ScoredArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoredArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoredArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
