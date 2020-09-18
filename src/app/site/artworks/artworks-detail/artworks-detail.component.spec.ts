import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksDetailComponent } from './artworks-detail.component';

describe('ArtworksDetailComponent', () => {
  let component: ArtworksDetailComponent;
  let fixture: ComponentFixture<ArtworksDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworksDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
