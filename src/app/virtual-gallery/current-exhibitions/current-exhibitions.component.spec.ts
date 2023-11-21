import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentExhibitionsComponent } from './current-exhibitions.component';

describe('CurrentExhibitionsComponent', () => {
  let component: CurrentExhibitionsComponent;
  let fixture: ComponentFixture<CurrentExhibitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentExhibitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentExhibitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
