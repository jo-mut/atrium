import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrVideoItemComponent } from './vr-video-item.component';

describe('VrVideoItemComponent', () => {
  let component: VrVideoItemComponent;
  let fixture: ComponentFixture<VrVideoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrVideoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrVideoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
