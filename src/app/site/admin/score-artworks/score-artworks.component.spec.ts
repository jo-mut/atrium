import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreArtworksComponent } from './score-artworks.component';

describe('ScoreArtworksComponent', () => {
  let component: ScoreArtworksComponent;
  let fixture: ComponentFixture<ScoreArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
