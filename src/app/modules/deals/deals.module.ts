import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsRoutingModule } from './deals-routing.module';
import { PageDealsComponent } from './page-deals/page-deals.component';


@NgModule({
  declarations: [
    PageDealsComponent
  ],
  imports: [
    CommonModule,
    DealsRoutingModule
  ]
})
export class DealsModule { }
