import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateVegetablePhotoPageModule } from '../update-vegetable-photo/update-vegetable-photo.module';
import { UpdateVegetablePhotoPage } from '../update-vegetable-photo/update-vegetable-photo.page';

import { VegetableAdminPage } from './vegetable-admin.page';

const routes: Routes = [
  {
    path: '',
    component: VegetableAdminPage
  }
];

@NgModule({
  entryComponents:[UpdateVegetablePhotoPage] ,
  imports: [RouterModule.forChild(routes),
            UpdateVegetablePhotoPageModule],
  exports: [RouterModule],
})
export class VegetableAdminPageRoutingModule {}
