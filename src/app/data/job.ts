export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities?: string;
  qualifications?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  type?: string; // Full-time, Part-time, etc.
  experienceLevel?: string; // Junior, Mid, Senior
  createdAt?: string;
  userId?: string;
}
