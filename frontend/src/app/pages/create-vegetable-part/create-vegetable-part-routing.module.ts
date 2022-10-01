import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVegetablePartPage } from './create-vegetable-part.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVegetablePartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVegetablePartPageRoutingModule {}
