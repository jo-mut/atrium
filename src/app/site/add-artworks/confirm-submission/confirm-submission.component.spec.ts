import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSubmissionComponent } from './confirm-submission.component';

describe('ConfirmSubmissionComponent', () => {
  let component: ConfirmSubmissionComponent;
  let fixture: ComponentFixture<ConfirmSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
