import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  cart: CartItem[] = [];

  // CUSTOMER FORM
  customer = {
    name: '',
    phone: '',
    address: '',
    payment: 'cash'
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();

    if (this.cart.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => {
      return sum + item.product.price * item.qty;
    }, 0);
  }

  placeOrder(): void {

    if (!this.customer.name || !this.customer.phone || !this.customer.address) {
      alert('Please fill all fields');
      return;
    }

    const order = {
      customer: this.customer,
      items: this.cart,
      total: this.getTotal(),
      date: new Date()
    };

    console.log('ORDER:', order);

    // clear cart
    this.cartService.clear();

    alert('Order success!');

    this.router.navigate(['/']);
  }

}