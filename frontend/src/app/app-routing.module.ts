import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'vegetable-admin',
    loadChildren: () => import('./pages/vegetable-admin/vegetable-admin.module').then( m => m.VegetableAdminPageModule)
  },
  {
    path: 'create-vegetable-part',
    loadChildren: () => import('./pages/create-vegetable-part/create-vegetable-part.module').then( m => m.CreateVegetablePartPageModule)
  },
  {
    path: 'update-vegetable-part',
    loadChildren: () => import('./pages/update-vegetable-part/update-vegetable-part.module').then( m => m.UpdateVegetablePartPageModule)
  },  {
    path: 'create-vegetable',
    loadChildren: () => import('./pages/create-vegetable/create-vegetable.module').then( m => m.CreateVegetablePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
