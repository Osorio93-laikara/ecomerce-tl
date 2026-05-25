import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagecartComponent } from './pagecart/pagecart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '', 
    component: PagecartComponent
  },
  {
    path: 'checkout', 
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
