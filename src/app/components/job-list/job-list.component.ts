import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../data/job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  standalone:false,
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
    
  location = '';
  type = '';
  experienceLevel = '';
  
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadAllJobs();
  }

  loadAllJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Erreur lors du chargement des offres :', err)
    });
  }

  searchJobs(): void {
    this.jobService.searchJobs(this.location, this.type, this.experienceLevel).subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Erreur lors de la recherche :', err)
    });
  }
}
