import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCategoriesComponent } from './page-categories/page-categories.component';

const routes: Routes = [
  {
    path: '',
    component: PageCategoriesComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
