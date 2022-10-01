import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegetableAdminPage } from './vegetable-admin.page';

const routes: Routes = [
  {
    path: '',
    component: VegetableAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegetableAdminPageRoutingModule {}
