import { Component, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.scss']
})
export class PartnershipComponent implements AfterViewInit {

  @ViewChild('viewport', { static: true }) viewport!: ElementRef;
  @ViewChild('track', { static: true }) track!: ElementRef;

  currentIndex = 0;

  brands = [
    { name: 'Apple', link: 'https://apple.com', logo: 'assets/brands/apple.png' },
    { name: 'Samsung', link: 'https://samsung.com', logo: 'assets/brands/samsung.png' },
    { name: 'Nike', link: 'https://nike.com', logo: 'assets/brands/nike.png' },
    { name: 'Adidas', link: 'https://adidas.com', logo: 'assets/brands/adidas.png' },
    { name: 'Sony', link: 'https://sony.com', logo: 'assets/brands/sony.png' },
    { name: 'Xiaomi', link: 'https://xiaomi.com', logo: 'assets/brands/xiaomi.png' }
  ];

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => this.center(), 0);
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.brands.length;
    this.center();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.brands.length) % this.brands.length;
    this.center();
  }

  setActive(i: number) {
    this.currentIndex = i;
    this.center();
  }

  center() {
    const viewport = this.viewport.nativeElement;
    const track = this.track.nativeElement;

    const items = track.querySelectorAll('.item');
    const active = items[this.currentIndex];

    if (!active) return;

    const viewportWidth = viewport.offsetWidth;

    const itemCenter =
      active.offsetLeft + active.offsetWidth / 2;

    const scroll = itemCenter - viewportWidth / 2;

    track.style.transform = `translateX(${-scroll}px)`;
  }
}