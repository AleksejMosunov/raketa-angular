import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRaces } from './active-races';

describe('ActiveRaces', () => {
  let component: ActiveRaces;
  let fixture: ComponentFixture<ActiveRaces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveRaces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveRaces);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
