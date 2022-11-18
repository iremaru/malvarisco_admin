import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateVegetablePhotoPage } from './update-vegetable-photo.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateVegetablePhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateVegetablePhotoPageRoutingModule {}
