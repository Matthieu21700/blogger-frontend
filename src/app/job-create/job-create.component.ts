import { Component } from '@angular/core';
import { JobService } from '../services/job.service';
import {UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-create',
  standalone: false,
  templateUrl: './job-create.component.html',
  styleUrl: './job-create.component.css'
})
export class JobCreateComponent {
  job = {
    title: '',
    description: '',
    responsibilities: '',
    qualifications: '',
    location: '',
    companyName:'',
    salary_min: 0,
    salary_max: 0,
    type: 'Full-time',
    experienceLevel: 'Junior',
  };

  constructor(private jobService: JobService, private router: Router,private UserService: UserService) {}

  createJob(): void {
    const userEmail = localStorage.getItem('userEmail');

      if (userEmail) {
        this.UserService.getIdByemail(userEmail).subscribe({
          next: (userId: string) => {
            console.log('ID utilisateur récupéré :', userId);

            // Tu peux maintenant appeler createJob ici :
            this.jobService.createJob({
              ...this.job,
              user: {
                id: userId
              }
            }).subscribe({
              next: () => {
                alert('Offre créée avec succès !');
                this.router.navigate(['/jobs']);
              },
              error: (err) => {
                console.error('Erreur lors de la création de l’offre :', err);
                alert('Erreur lors de la création de l’offre.');
              }
            });
          },
          error: (err) => {
            console.error('Erreur lors de la récupération de l\'ID utilisateur :', err);
            alert('Erreur lors de la récupération de l\'utilisateur.');
          }
        });
      } else {
        alert('Vous devez être connecté pour publier une offre.');
      }
        }
}
