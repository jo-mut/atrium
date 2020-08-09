import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesItemDetailComponent } from './archives-item-detail.component';

describe('ArchivesItemDetailComponent', () => {
  let component: ArchivesItemDetailComponent;
  let fixture: ComponentFixture<ArchivesItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivesItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivesItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
