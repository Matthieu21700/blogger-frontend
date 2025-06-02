import { Job } from "./job";
import { User } from "./user";


export interface Application {
  id: string; // UUID
  user: User;
  job: Job;
  appliedAt: string; // ou Date, si tu veux le convertir avec `new Date(appliedAt)`
}
