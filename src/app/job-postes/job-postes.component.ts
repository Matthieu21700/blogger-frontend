import { Component, OnInit } from '@angular/core';
import { Job } from '../data/job';
import { JobService } from '../services/job.service';
import { ApplicationService } from '../services/application.service';
import { Application } from '../data/application';
import Swal from 'sweetalert2';

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
  toggleApplications(jobId: string): void {
    if (this.showApplicationsForJobId === jobId) {
      this.showApplicationsForJobId = null;
      this.selectedJobApplications = [];
    } else {
      this.showApplicationsForJobId = jobId;
      this.loadApplicationsForJob(jobId);
    }
  }
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
  isShowingApplications(jobId: string): boolean {
    return this.showApplicationsForJobId === jobId;
  }
  acceptApplication(application: Application): void {
    Swal.fire({
      title: 'Accepter la candidature',
      input: 'textarea',
      inputLabel: 'Message pour le candidat (optionnel)',
      inputPlaceholder: 'Félicitations ! Nous souhaitons vous rencontrer...',
      showCancelButton: true,
      confirmButtonText: 'Accepter',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#28a745'
    }).then((result) => {
      if (result.isConfirmed) {
        const message = result.value || 'Votre candidature a été acceptée !';
        
        this.applicationService.acceptApplication(application.id, message).subscribe({
          next: () => {
            Swal.fire('Succès', 'Candidature acceptée avec succès !', 'success');
            this.loadApplicationsForJob(application.job.id);
          },
          error: (err) => {
            console.error('Erreur lors de l\'acceptation :', err);
            Swal.fire('Erreur', 'Erreur lors de l\'acceptation de la candidature.', 'error');
          }
        });
      }
    });
  }

  rejectApplication(application: Application): void {
    Swal.fire({
      title: 'Refuser la candidature',
      input: 'textarea',
      inputLabel: 'Message pour le candidat (optionnel)',
      inputPlaceholder: 'Nous vous remercions pour votre candidature, cependant...',
      showCancelButton: true,
      confirmButtonText: 'Refuser',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.isConfirmed) {
        const message = result.value || 'Votre candidature n\'a pas été retenue.';
        
        this.applicationService.rejectApplication(application.id, message).subscribe({
          next: () => {
            Swal.fire('Candidature refusée', 'Le candidat sera notifié.', 'info');
            this.loadApplicationsForJob(application.job.id);
          },
          error: (err) => {
            console.error('Erreur lors du refus :', err);
            Swal.fire('Erreur', 'Erreur lors du refus de la candidature.', 'error');
          }
        });
      }
    });
  }

  deleteJob(jobId: string): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action supprimera définitivement l\'offre et toutes les candidatures associées.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobService.deleteJob(jobId).subscribe({
          next: () => {
            Swal.fire(
              'Supprimée !',
              'L\'offre a été supprimée avec succès.',
              'success'
            );
            this.jobs = this.jobs.filter(job => job.id !== jobId);
            if (this.showApplicationsForJobId === jobId) {
              this.showApplicationsForJobId = null;
              this.selectedJobApplications = [];
            }
          },
          error: (err) => {
            console.error('Erreur lors de la suppression :', err);
            Swal.fire(
              'Erreur',
              'Erreur lors de la suppression de l\'offre.',
              'error'
            );
          }
        });
      }
    });
  }
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ACCEPTED': return 'badge bg-success';
      case 'REJECTED': return 'badge bg-danger';
      case 'PENDING': return 'badge bg-warning';
      default: return 'badge bg-secondary';
    }
  }
  getStatusText(status: string): string {
    switch (status) {
      case 'ACCEPTED': return 'Acceptée';
      case 'REJECTED': return 'Refusée';
      case 'PENDING': return 'En attente';
      default: return 'Inconnu';
    }
  }
}