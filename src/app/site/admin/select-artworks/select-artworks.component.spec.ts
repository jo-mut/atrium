import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectArtworksComponent } from './select-artworks.component';

describe('SelectArtworksComponent', () => {
  let component: SelectArtworksComponent;
  let fixture: ComponentFixture<SelectArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
