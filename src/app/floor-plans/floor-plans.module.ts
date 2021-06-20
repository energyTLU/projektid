import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FloorPlansPageRoutingModule } from './floor-plans-routing.module';

import { FloorPlansPage } from './floor-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FloorPlansPageRoutingModule
  ],
  declarations: [FloorPlansPage]
})
export class FloorPlansPageModule {}
