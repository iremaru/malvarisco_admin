import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UpdateVegetablePartPage } from './update-vegetable-part.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateVegetablePartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
            ReactiveFormsModule,
          ],
  exports: [RouterModule],
})
export class UpdateVegetablePartPageRoutingModule {}
