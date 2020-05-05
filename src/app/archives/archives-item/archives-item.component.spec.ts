import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesItemComponent } from './archives-item.component';

describe('ArchivesItemComponent', () => {
  let component: ArchivesItemComponent;
  let fixture: ComponentFixture<ArchivesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
