import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HeaderComponent } from '../layout/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PromoGridComponent } from './components/promo-grid/promo-grid.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PartnershipComponent } from './components/partnership/partnership.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    HeroComponent,
    ProductListComponent,
    PromoGridComponent,
    PartnershipComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    ProductCardComponent,
    HeroComponent,
    ProductListComponent,
    PromoGridComponent,
    PartnershipComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}