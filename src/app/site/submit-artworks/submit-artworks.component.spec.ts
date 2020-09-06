import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitArtworksComponent } from './submit-artworks.component';

describe('SubmitArtworksComponent', () => {
  let component: SubmitArtworksComponent;
  let fixture: ComponentFixture<SubmitArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
