import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaInfoComponent } from './social-media-info.component';

describe('SocialMediaInfoComponent', () => {
  let component: SocialMediaInfoComponent;
  let fixture: ComponentFixture<SocialMediaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
