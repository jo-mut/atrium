import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionViewComponent } from './exhibition-view.component';

describe('ExhibitionViewComponent', () => {
  let component: ExhibitionViewComponent;
  let fixture: ComponentFixture<ExhibitionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
