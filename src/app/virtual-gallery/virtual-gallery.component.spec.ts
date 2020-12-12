import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualGalleryComponent } from './virtual-gallery.component';

describe('VirtualGalleryComponent', () => {
  let component: VirtualGalleryComponent;
  let fixture: ComponentFixture<VirtualGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
