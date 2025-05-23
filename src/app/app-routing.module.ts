import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './components/formulaire/post-form.component';
import { JobListComponent } from './components/job-list/job-list.component';

const routes: Routes = [
  {path: 'add-post', component: PostFormComponent },
  {path: '',component:PostListComponent},
  {path:'home',component: JobListComponent},
    // Route pour le formulaire
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
