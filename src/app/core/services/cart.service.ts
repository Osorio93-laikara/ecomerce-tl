import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';

export interface CartItem {
  product: Product;
  qty: number;
  selectedSize?: string;
  selectedColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart';

  // 🔥 REALTIME STREAM
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    if (this.isBrowser()) {
      this.updateCartCount();
    }
  }

  // =========================
  // BROWSER CHECK (FIX ERROR SSR)
  // =========================
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // =========================
  // GET CART
  // =========================
  getCart(): CartItem[] {
    if (!this.isBrowser()) return [];
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // =========================
  // SAVE CART
  // =========================
  saveCart(cart: CartItem[]): void {
    if (!this.isBrowser()) return;

    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.updateCartCount();
  }

  // =========================
  // ADD TO CART
  // =========================
  addToCart(item: CartItem): void {

    const cart = this.getCart();

    const existing = cart.find(c =>
      c.product.id === item.product.id &&
      c.selectedColor === item.selectedColor &&
      c.selectedSize === item.selectedSize
    );

    if (existing) {
      existing.qty += item.qty;
    } else {
      cart.push(item);
    }

    this.saveCart(cart);
  }

  // =========================
  // UPDATE QTY
  // =========================
  updateQty(index: number, qty: number): void {

    const cart = this.getCart();

    if (cart[index]) {
      cart[index].qty = qty;
      this.saveCart(cart);
    }
  }

  // =========================
  // REMOVE ITEM
  // =========================
  remove(index: number): void {

    const cart = this.getCart();

    if (cart[index]) {
      cart.splice(index, 1);
      this.saveCart(cart);
    }
  }

  // =========================
  // CLEAR CART
  // =========================
  clear(): void {

    if (!this.isBrowser()) return;

    localStorage.removeItem(this.storageKey);

    this.updateCartCount();
  }

  // =========================
  // COUNT CALCULATOR
  // =========================
  private updateCartCount(): void {

    const cart = this.getCart();

    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    this.cartCountSubject.next(count);
  }
}