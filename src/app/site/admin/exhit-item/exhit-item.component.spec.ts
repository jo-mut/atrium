import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhitItemComponent } from './exhit-item.component';

describe('ExhitItemComponent', () => {
  let component: ExhitItemComponent;
  let fixture: ComponentFixture<ExhitItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhitItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
