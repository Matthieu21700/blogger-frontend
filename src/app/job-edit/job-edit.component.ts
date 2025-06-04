import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-edit',
  standalone: false,
  templateUrl: './job-edit.component.html',
  styleUrl: './job-edit.component.css'
})
export class JobEditComponent implements OnInit {
  jobId!: string;
  job = {
    title: '',
    description: '',
    responsibilities: '',
    qualifications: '',
    location: '',
    companyName: '',
    salaryMin: 0,
    salaryMax: 0,
    type: 'Full-time',
    experienceLevel: 'Junior',
  };

  isLoading = true;
  canEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private userService: UserService
  ) {}
  isSalaryRangeInvalid(): boolean {
    return this.job.salaryMin > 0 && this.job.salaryMax > 0 && this.job.salaryMin > this.job.salaryMax;
  }

  isFormValid(): boolean {
    return !this.isSalaryRangeInvalid();
  }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.loadJobData();
  }

  loadJobData(): void {
    this.jobService.getJobById(this.jobId).subscribe({
      next: (jobData) => {
        this.job = {
          title: jobData.title || '',
          description: jobData.description || '',
          responsibilities: jobData.responsibilities || '',
          qualifications: jobData.qualifications || '',
          location: jobData.location || '',
          companyName: this.convertToString(jobData.companyName) || '',
          salaryMin: jobData.salaryMin || 0,
          salaryMax: jobData.salaryMax || 0,
          type: jobData.type || 'Full-time',
          experienceLevel: jobData.experienceLevel || 'Junior'
        };
        this.checkEditPermission();
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'offre :', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger les données de l\'offre.'
        }).then(() => {
          this.router.navigate(['/annonces']);
        });
      }
    });
  }
  private convertToString(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    return String(value);
  }

  checkEditPermission(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.jobService.canUserEditJob(this.jobId, userId).subscribe({
        next: (canEdit) => {
          this.canEdit = canEdit;
          this.isLoading = false;
          
          if (!canEdit) {
            Swal.fire({
              icon: 'warning',
              title: 'Accès refusé',
              text: 'Vous n\'êtes pas autorisé à modifier cette offre.'
            }).then(() => {
              this.router.navigate(['/annonces']);
            });
          }
        },
        error: (err) => {
          console.error('Erreur lors de la vérification des permissions :', err);
          this.isLoading = false;
          this.router.navigate(['/annonces']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateJob(): void {
    if (!this.canEdit) {
      return;
    }
    if (this.isSalaryRangeInvalid()) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur de validation',
        text: 'Le salaire minimum ne peut pas être supérieur au salaire maximum.'
      });
      return;
    }

    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      this.userService.getIdByemail(userEmail).subscribe({
        next: (userId: string) => {
          this.jobService.updateJob(this.jobId, {
            ...this.job,
            user: { id: userId }
          }).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Offre mise à jour avec succès !',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                this.router.navigate(['/annonces']);
              });
            },
            error: (err) => {
              console.error('Erreur lors de la mise à jour de l\'offre :', err);
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Erreur lors de la mise à jour de l\'offre.'
              });
            }
          });
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'ID utilisateur :', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de la récupération de l\'utilisateur.'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Connexion requise',
        text: 'Vous devez être connecté pour modifier une offre.'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/annonces']);
  }
}