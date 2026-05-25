import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module')
      .then(m => m.HomeModule)
  },
    {
    path: 'products',
    loadChildren: () =>
      import('./modules/product/product.module')
      .then(m => m.ProductModule)
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart.module')
      .then(m => m.CartModule)
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./modules/categories/categories.module')
      .then(m => m.CategoriesModule)
  },
  {
    path: 'deals',
    loadChildren: () =>
      import('./modules/deals/deals.module')
      .then(m => m.DealsModule)
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/contact/contact.module')
      .then(m => m.ContactModule)
  }
];

@NgModule({
    imports: [
    RouterModule.forRoot(routes, {

      // 🔥 AUTO SCROLL KE ATAS
      scrollPositionRestoration: 'top',

      // optional smooth behavior
      anchorScrolling: 'enabled'

    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
