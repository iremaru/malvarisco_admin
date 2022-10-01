import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateVegetablePartPageRoutingModule } from './update-vegetable-part-routing.module';

import { UpdateVegetablePartPage } from './update-vegetable-part.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateVegetablePartPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [UpdateVegetablePartPage]
})
export class UpdateVegetablePartPageModule {}
