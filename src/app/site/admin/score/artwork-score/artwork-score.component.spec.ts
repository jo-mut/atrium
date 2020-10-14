import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkScoreComponent } from './artwork-score.component';

describe('ArtworkScoreComponent', () => {
  let component: ArtworkScoreComponent;
  let fixture: ComponentFixture<ArtworkScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworkScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
