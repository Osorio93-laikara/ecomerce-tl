import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagecart',
  templateUrl: './pagecart.component.html',
  styleUrl: './pagecart.component.scss'
})
export class PagecartComponent implements OnInit {

  cart: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = this.cartService.getCart();
  }

  increase(item: CartItem, index: number): void {
    item.qty++;
    this.cartService.updateQty(index, item.qty);
  }

  decrease(item: CartItem, index: number): void {
    if (item.qty > 1) {
      item.qty--;
      this.cartService.updateQty(index, item.qty);
    }
  }

  remove(index: number): void {
    this.cartService.remove(index);
    this.loadCart();
  }

  clear(): void {
    this.cartService.clear();
    this.loadCart();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => {
      return sum + item.product.price * item.qty;
    }, 0);
  }

  checkout(): void {
  this.router.navigate(['cart/checkout']);
}
}