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
  unreadNotifications: Application[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Charger toutes les candidatures
      this.applicationService.getApplicationsByUserId(userId).subscribe({
        next: data => {
          this.applications = data;
        },
        error: err => {
          console.error('Erreur lors de la récupération des candidatures :', err);
        }
      });

      // Charger les notifications non lues
      this.applicationService.getUnreadNotifications(userId).subscribe({
        next: notifications => {
          this.unreadNotifications = notifications;
        },
        error: err => {
          console.error('Erreur lors de la récupération des notifications :', err);
        }
      });
    }
  }

  // Marquer une notification comme lue
  markAsRead(application: Application): void {
    if (!application.notificationRead) {
      this.applicationService.markNotificationAsRead(application.id).subscribe({
        next: () => {
          application.notificationRead = true;
          // Retirer de la liste des notifications non lues
          this.unreadNotifications = this.unreadNotifications.filter(
            notif => notif.id !== application.id
          );
        },
        error: err => {
          console.error('Erreur lors du marquage comme lu :', err);
        }
      });
    }
  }

  // Méthode pour obtenir le badge de statut
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ACCEPTED': return 'badge bg-success';
      case 'REJECTED': return 'badge bg-danger';
      case 'PENDING': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  }

  // Méthode pour obtenir le texte du statut
  getStatusText(status: string): string {
    switch (status) {
      case 'ACCEPTED': return 'Acceptée';
      case 'REJECTED': return 'Refusée';
      case 'PENDING': return 'En attente';
      default: return 'Inconnu';
    }
  }

  // Vérifier si une candidature a une nouvelle notification
  hasNewNotification(application: Application): boolean {
    return !application.notificationRead && application.status !== 'PENDING';
  }
}