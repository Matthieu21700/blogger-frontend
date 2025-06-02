import { Job } from "./job";
import { User } from "./user";

export interface WorkExperience {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Application {
  id: string; // UUID
  user: User;
  job: Job;
  appliedAt: string;
  
  // NOUVEAUX CHAMPS
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  decidedAt?: string;
  recruiterMessage?: string;
  notificationRead: boolean;
  
  // Propriétés existantes pour les informations de candidature
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  skills?: string[]; // Tableau de compétences
  workExperiences?: WorkExperience[]; // Tableau d'expériences
}