import { Component, OnInit } from '@angular/core';
import { Application } from '../data/application';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-candidatures',
  standalone: false,
  templateUrl: './candidatures.component.html',
  styleUrl: './candidatures.component.css'
})
export class CandidaturesComponent implements OnInit{
  applications: Application[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // à adapter selon ton auth
    if (userId) {
      this.applicationService.getApplicationsByUserId(userId).subscribe({
        next: data => {
          this.applications = data;
        },
        error: err => {
          console.error('Erreur lors de la récupération des candidatures :', err);
        }
      });
    }
  }
}
