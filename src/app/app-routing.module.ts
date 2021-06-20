import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'edit-project',
    loadChildren: () => import('./edit-project/edit-project.module').then( m => m.EditProjectPageModule)
  },
  {
    path: 'project-details',
    loadChildren: () => import('./project-details/project-details.module').then( m => m.ProjectDetailsPageModule)
  },
  {
    path: 'floor-plans',
    loadChildren: () => import('./floor-plans/floor-plans.module').then( m => m.FloorPlansPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
