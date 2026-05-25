import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.scss']
})
export class PartnershipComponent implements OnInit, OnDestroy {

  brands = [
    { name: 'Apple', logo: 'assets/brands/apple.png' },
    { name: 'Samsung', logo: 'assets/brands/samsung.png' },
    { name: 'Nike', logo: 'assets/brands/nike.png' },
    { name: 'Adidas', logo: 'assets/brands/adidas.png' },
    { name: 'Sony', logo: 'assets/brands/sony.png' },
    { name: 'Xiaomi', logo: 'assets/brands/xiaomi.png' },
    { name: 'HP', logo: 'assets/brands/hp.png' },
    { name: 'Lenovo', logo: 'assets/brands/lenovo.png' }
  ];

  currentIndex: number = 0; // ✅ WAJIB ADA

  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 2500);
  }

  next(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.brands.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.brands.length) % this.brands.length;
  }

  goTo(i: number): void {
    this.currentIndex = i;
  }

  getTransform(): string {
    return `translateX(calc(-${this.currentIndex * 180}px + 50%))`;
  }
}