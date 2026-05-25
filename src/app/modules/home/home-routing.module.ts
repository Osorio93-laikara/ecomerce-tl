import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: CardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}