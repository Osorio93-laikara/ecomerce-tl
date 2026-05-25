import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-page-deals',
  templateUrl: './page-deals.component.html',
  styleUrl: './page-deals.component.scss'
})
export class PageDealsComponent implements OnInit {

  deals: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => {

      this.deals = data.filter(
        item => item.price < 1000
      );

    });

  }

  goToDetail(id: number, event: Event): void {

    event.stopPropagation();

    this.router.navigate(['/product', id]);

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

  buyNow(product: Product, event: Event): void {

    event.stopPropagation();

    this.cartService.addToCart({
      product: product,
      qty: 1,
      selectedSize: product.size || undefined,
      selectedColor: product.colors?.[0] || undefined
    });

    this.router.navigate(['/cart/checkout']);

  }

}