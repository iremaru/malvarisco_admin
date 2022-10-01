import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegetableAdminPageRoutingModule } from './vegetable-admin-routing.module';

import { VegetableAdminPage } from './vegetable-admin.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegetableAdminPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [VegetableAdminPage,]
})
export class VegetableAdminPageModule {}
