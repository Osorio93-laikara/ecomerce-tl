import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  tabs: string[] = ['Featured', 'On Sale', 'Top Rated', 'New Arrivals'];
  activeTab: string = 'Featured';

  products: Product[] = [];
  filteredProducts: Product[] = [];

  // 🔥 QUICK VIEW
  quickViewProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyTabFilter();
      },
      error: (err) => console.error('Gagal memuat produk', err)
    });
  }

  // =========================
  // TAB
  // =========================
  selectTab(tab: string): void {
    this.activeTab = tab;
    this.applyTabFilter();
  }

  // =========================
  // FILTER
  // =========================
  applyTabFilter(): void {

    let data = [...this.products];

    switch (this.activeTab) {

      case 'Featured':
        data = data.filter(p => (p.rating || 0) >= 4);
        break;

      case 'On Sale':
        data = data.filter(p => (p.price || 0) < 600);
        break;

      case 'Top Rated':
        data = data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;

      case 'New Arrivals':
        data = data.slice().reverse();
        break;
    }

    this.filteredProducts = data.slice(0, 4);
  }

  // =========================
  // DETAIL PAGE
  // =========================
  goToDetail(id: number): void {
    this.router.navigate(['/product', id]);
  }

  // =========================
  // QUICK VIEW
  // =========================
  openQuickView(product: Product, event: Event): void {

    event.stopPropagation();

    this.quickViewProduct = product;
  }

  closeQuickView(): void {
    this.quickViewProduct = null;
  }

  // =========================
  // STARS
  // =========================
  getStars(rating: number): number[] {
    const rounded = Math.round(rating || 0);
    return Array(rounded).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    const rounded = Math.round(rating || 0);
    return Array(5 - rounded > 0 ? 5 - rounded : 0).fill(0);
  }

    addToCart(product: Product, event: Event): void {

    event.stopPropagation();

    this.cartService.addToCart({
      product: product,
      qty: 1,
      selectedSize: product.size || undefined,
      selectedColor: product.colors?.[0] || undefined
    });

    window.dispatchEvent(new Event('storage'));

    alert('Added to cart!');

    this.router.navigate(['/cart']);

  }

}