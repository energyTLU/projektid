import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloorPlansPage } from './floor-plans.page';

const routes: Routes = [
  {
    path: '',
    component: FloorPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloorPlansPageRoutingModule {}
