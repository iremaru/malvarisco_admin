import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVegetablePage } from './create-vegetable.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVegetablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVegetablePageRoutingModule {}
