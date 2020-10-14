import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoredItemComponent } from './scored-item.component';

describe('ScoredItemComponent', () => {
  let component: ScoredItemComponent;
  let fixture: ComponentFixture<ScoredItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoredItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoredItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
