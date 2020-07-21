import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedViewComponent } from './archived-view.component';

describe('ArchivedViewComponent', () => {
  let component: ArchivedViewComponent;
  let fixture: ComponentFixture<ArchivedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
