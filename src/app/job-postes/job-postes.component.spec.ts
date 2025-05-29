import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostesComponent } from './job-postes.component';

describe('JobPostesComponent', () => {
  let component: JobPostesComponent;
  let fixture: ComponentFixture<JobPostesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
