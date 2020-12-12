import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhitArtworksComponent } from './exhit-artworks.component';

describe('ExhitArtworksComponent', () => {
  let component: ExhitArtworksComponent;
  let fixture: ComponentFixture<ExhitArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhitArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhitArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
