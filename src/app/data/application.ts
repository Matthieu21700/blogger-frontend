import { Job } from "./job";
import { User } from "./user";

export interface WorkExperience {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Application {
  id: string; 
  user: User;
  job: Job;
  appliedAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  decidedAt?: string;
  recruiterMessage?: string;
  notificationRead: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  skills?: string[]; 
  workExperiences?: WorkExperience[]; 
}