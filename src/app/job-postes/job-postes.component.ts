import { Component, OnInit } from '@angular/core';
import { Job } from '../data/job';
import { JobService } from '../services/job.service';
import { ApplicationService } from '../services/application.service';
import { Application } from '../data/application';

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
  description='';
  experienceLevel = '';
  companyName = '';
  salaryMin: number | null = null;
  salaryMax: number | null = null;
  
  // NOUVEAU : Pour gérer l'affichage des candidatures
  selectedJobApplications: Application[] = [];
  showApplicationsForJobId: string | null = null;

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService
  ) {}

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
    const areAllFieldsEmpty = 
      !this.location.trim() &&
      !this.type.trim() &&
      !this.experienceLevel.trim() &&
      !this.companyName.trim() &&
      !this.description.trim() &&
      this.salaryMin === null &&
      this.salaryMax === null;

    const userId = localStorage.getItem('userId');

    if (areAllFieldsEmpty && userId) {
      this.jobService.getJobsByUserId(userId).subscribe({
        next: (data) => this.jobs = data,
        error: (err) => console.error('Erreur lors de la récupération des jobs utilisateur :', err)
      });
    } else {
      this.jobService.searchJobs(
        this.location,
        this.type,
        this.experienceLevel,
        this.companyName,
        this.description,
        this.salaryMin,
        this.salaryMax
      ).subscribe({
        next: (data) => this.jobs = data,
        error: (err) => console.error('Erreur lors de la recherche :', err)
      });
    }
  }

  // NOUVELLE MÉTHODE : Afficher/masquer les candidatures pour une offre
  toggleApplications(jobId: string): void {
    if (this.showApplicationsForJobId === jobId) {
      // Si on clique sur la même offre, on masque les candidatures
      this.showApplicationsForJobId = null;
      this.selectedJobApplications = [];
    } else {
      // Sinon, on affiche les candidatures pour cette offre
      this.showApplicationsForJobId = jobId;
      this.loadApplicationsForJob(jobId);
    }
  }

  // NOUVELLE MÉTHODE : Charger les candidatures pour une offre spécifique
  loadApplicationsForJob(jobId: string): void {
    this.applicationService.getApplicationsByJobId(jobId).subscribe({
      next: (applications) => {
        this.selectedJobApplications = applications;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des candidatures :', err);
        this.selectedJobApplications = [];
      }
    });
  }

  // NOUVELLE MÉTHODE : Vérifier si les candidatures sont affichées pour une offre
  isShowingApplications(jobId: string): boolean {
    return this.showApplicationsForJobId === jobId;
  }
}