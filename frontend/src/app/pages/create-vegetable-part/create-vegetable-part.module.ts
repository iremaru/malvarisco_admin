import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateVegetablePartPageRoutingModule } from './create-vegetable-part-routing.module';

import { CreateVegetablePartPage } from './create-vegetable-part.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateVegetablePartPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateVegetablePartPage]
})
export class CreateVegetablePartPageModule {}
