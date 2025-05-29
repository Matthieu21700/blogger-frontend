import { Component,OnInit } from '@angular/core';
import { Job } from '../data/job';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-postes',
  standalone: false,
  templateUrl: './job-postes.component.html',
  styleUrl: './job-postes.component.css'
})
export class JobPostesComponent implements OnInit{
  jobs: Job[] = [];
  location = '';
  type = '';
  experienceLevel = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.jobService.getJobsByUserId(userId).subscribe({
        next: (data) => {
          this.jobs = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des jobs :', err);
        }
      });
    } else {
      console.warn("Aucun userId trouvé dans le localStorage.");
    }
  }
  searchJobs(): void {
    this.jobService.searchJobs(this.location, this.type, this.experienceLevel).subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Erreur lors de la recherche :', err)
    });
  }

}
