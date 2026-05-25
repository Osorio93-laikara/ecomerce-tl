import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../interfaces/product.interface';

import { Router } from '@angular/router';

interface PromoGridItem {
  product: Product;
  gridClass: string;
  displayTitle: string;
  subtitle: string;
  alignRight?: boolean;
}

@Component({
  selector: 'app-promo-grid',
  templateUrl: './promo-grid.component.html',
  styleUrls: ['./promo-grid.component.scss']
})
export class PromoGridComponent implements OnInit {

  promoItems: PromoGridItem[] = [];

  constructor(
    private productService: ProductService,
     private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPromoProducts();
  }

  loadPromoProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.mapProductsToGrid(products);
      },
      error: (err) => {
        console.error('Gagal memuat promo grid', err);
      }
    });
  }

  private mapProductsToGrid(products: Product[]): void {

    this.promoItems = products
      .slice(0, 8) // 🔥 hanya 8 data
      .map((product, index) => {

        let gridClass = 'normal';

        // 🔥 AUTO SHOPEE STYLE LAYOUT
        if (index === 1 || index === 4) {
          gridClass = 'large';
        } else if (index % 3 === 0) {
          gridClass = 'wide';
        }

        return {
          product,
          gridClass,
          displayTitle: product.promoTitle || product.title,
          subtitle: product.promoSubtitle || `Now starting at $${product.price}`,
          alignRight: product.alignRight || false
        };

      });
  }
  goToDetail(id: number, event: Event): void {

  event.stopPropagation(); // biar tidak trigger card click kalau ada

  this.router.navigate(['/product', id]);
}
}