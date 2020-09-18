import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCuratorModalComponent } from './add-curator-modal.component';

describe('AddCuratorModalComponent', () => {
  let component: AddCuratorModalComponent;
  let fixture: ComponentFixture<AddCuratorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCuratorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCuratorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
