import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRuns } from './all-runs';

describe('AllRuns', () => {
  let component: AllRuns;
  let fixture: ComponentFixture<AllRuns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRuns],
    }).compileComponents();

    fixture = TestBed.createComponent(AllRuns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
