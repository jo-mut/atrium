import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkInfoComponent } from './artwork-info.component';

describe('ArtworkInfoComponent', () => {
  let component: ArtworkInfoComponent;
  let fixture: ComponentFixture<ArtworkInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworkInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
