import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkModalComponent } from './artwork-modal.component';

describe('ArtworkModalComponent', () => {
  let component: ArtworkModalComponent;
  let fixture: ComponentFixture<ArtworkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
