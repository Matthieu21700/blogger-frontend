// src/app/job-application/job-application.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { ApplicationService } from '../services/application.service';
import { UserService } from '../services/user.service';
import { Job } from '../data/job';

@Component({
  selector: 'app-job-application',
  standalone: false,
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.css'
})
export class JobApplicationComponent implements OnInit {
  jobId!: string;
  job: Job | null = null;
  
  application = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    workExperiences: [
      {
        title: '',
        description: '',
        startDate: '',
        endDate: ''
      }
    ],
    skills: ['']
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private jobService: JobService,
    private applicationService: ApplicationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('jobId')!;
    this.loadJob();
    this.loadUserInfo();
  }

  loadJob(): void {
    this.jobService.getJobById(this.jobId).subscribe({
      next: (job) => this.job = job,
      error: (err) => console.error('Erreur lors du chargement du job:', err)
    });
  }

  loadUserInfo(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      // Pré-remplir avec les infos utilisateur si disponibles
      this.application.email = userEmail;
    }
  }

  addWorkExperience(): void {
    this.application.workExperiences.push({
      title: '',
      description: '',
      startDate: '',
      endDate: ''
    });
  }

  removeWorkExperience(index: number): void {
    if (this.application.workExperiences.length > 1) {
      this.application.workExperiences.splice(index, 1);
    }
  }

  addSkill(): void {
    this.application.skills.push('');
  }

  removeSkill(index: number): void {
    if (this.application.skills.length > 1) {
      this.application.skills.splice(index, 1);
    }
  }
  
  trackByIndex(index: number, item: any): number {
    return index;
  }

  submitApplication(): void {
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
      alert('Vous devez être connecté pour postuler.');
      this.router.navigate(['/login']);
      return;
    }

    // Récupérer l'ID utilisateur
    this.userService.getIdByemail(userEmail).subscribe({
      next: (userId: string) => {
        // Filtrer les compétences et expériences vides
        const filteredSkills = this.application.skills.filter(skill => skill.trim());
        const filteredExperiences = this.application.workExperiences.filter(exp => 
          exp.title.trim() && exp.description.trim()
        );

        const applicationData = {
          user: { id: userId },
          job: { id: this.jobId },
          firstName: this.application.firstName,
          lastName: this.application.lastName,
          email: this.application.email,
          phone: this.application.phone,
          // Envoyer les compétences et expériences sous forme de chaînes JSON
          skills: JSON.stringify(filteredSkills),
          workExperiences: JSON.stringify(filteredExperiences)
        };

        console.log('Données envoyées:', applicationData);

        this.applicationService.createApplication(applicationData).subscribe({
          next: (response) => {
            console.log('Candidature créée:', response);
            alert('Candidature envoyée avec succès !');
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'envoi de la candidature:', err);
            alert('Erreur lors de l\'envoi de la candidature.');
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', err);
        alert('Erreur lors de la récupération des informations utilisateur.');
      }
    });
  }
}