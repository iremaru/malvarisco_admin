import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateVegetablePageRoutingModule } from './create-vegetable-routing.module';

import { CreateVegetablePage } from './create-vegetable.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateVegetablePageRoutingModule,
    SharedModule
  ],
  declarations: [CreateVegetablePage]
})
export class CreateVegetablePageModule {}
