import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateVegetablePhotoPageRoutingModule } from './update-vegetable-photo-routing.module';

import { UpdateVegetablePhotoPage } from './update-vegetable-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [UpdateVegetablePhotoPage]
})
export class UpdateVegetablePhotoPageModule {}
