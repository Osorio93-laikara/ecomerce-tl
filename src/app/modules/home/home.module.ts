import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HomeComponent,
    CardDetailComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class HomeModule { }
