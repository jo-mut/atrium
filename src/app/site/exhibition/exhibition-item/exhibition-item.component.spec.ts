import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionItemComponent } from './exhibition-item.component';

describe('ExhibitionItemComponent', () => {
  let component: ExhibitionItemComponent;
  let fixture: ComponentFixture<ExhibitionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
