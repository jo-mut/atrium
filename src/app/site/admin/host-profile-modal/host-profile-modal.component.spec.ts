import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostProfileModalComponent } from './host-profile-modal.component';

describe('HostProfileModalComponent', () => {
  let component: HostProfileModalComponent;
  let fixture: ComponentFixture<HostProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostProfileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
