import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnersList } from './runners-list';

describe('RunnersList', () => {
  let component: RunnersList;
  let fixture: ComponentFixture<RunnersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunnersList],
    }).compileComponents();

    fixture = TestBed.createComponent(RunnersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
