import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnerPreview } from './runner-preview';

describe('RunnerPreview', () => {
  let component: RunnerPreview;
  let fixture: ComponentFixture<RunnerPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunnerPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(RunnerPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
