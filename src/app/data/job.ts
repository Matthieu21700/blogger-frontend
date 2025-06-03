export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities?: string;
  qualifications?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  companyName?: string; 
  type?: string; 
  experienceLevel?: string; 
  createdAt?: string;
  userId?: string;
}