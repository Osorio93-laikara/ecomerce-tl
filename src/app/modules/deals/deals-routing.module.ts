import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDealsComponent } from './page-deals/page-deals.component';

const routes: Routes = [
  {
    path: '',
    component: PageDealsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule { }
