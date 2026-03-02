import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSelection } from './track-selection';

describe('TrackSelection', () => {
  let component: TrackSelection;
  let fixture: ComponentFixture<TrackSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
