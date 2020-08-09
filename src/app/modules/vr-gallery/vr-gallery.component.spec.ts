import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrGalleryComponent } from './vr-gallery.component';

describe('VrGalleryComponent', () => {
  let component: VrGalleryComponent;
  let fixture: ComponentFixture<VrGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
