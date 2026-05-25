import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isScrolled = false;
  menuOpen = false;

  cartCount = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // 🔥 REALTIME LISTENER
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}