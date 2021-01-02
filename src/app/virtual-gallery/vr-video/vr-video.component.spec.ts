import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrVideoComponent } from './vr-video.component';

describe('VrVideoComponent', () => {
  let component: VrVideoComponent;
  let fixture: ComponentFixture<VrVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
