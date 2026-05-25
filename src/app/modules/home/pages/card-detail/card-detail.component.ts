import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent implements OnInit {

  product!: Product;
  relatedProducts: Product[] = [];

  selectedImage: string | null = null;

  selectedSize: string = '128GB';
  selectedColor: string = '#000000';

  qty: number = 1;

  sizes: string[] = ['64GB', '128GB', '256GB'];

  activeTab: string = 'description';

  // =========================
  // ZOOM
  // =========================
  cursorX = 0;
  cursorY = 0;
  zoomActive = false;

  zoomPosition = {
    backgroundPosition: '50% 50%'
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

      this.productService.getProducts().subscribe(res => {

        const found = res.find(p => p.id === id);

        if (!found) {
          this.router.navigate(['/']);
          return;
        }

        this.product = found;

        this.relatedProducts = res.filter(p => p.id !== id);

        this.selectedImage = this.product.image;

        this.selectedColor = this.product.colors?.[0] || '#000000';

        this.selectedSize = this.sizes[1];

      });

    });

  }

  // =========================
  // ADD TO CART (REAL)
  // =========================
  addToCart(): void {

    this.cartService.addToCart({
      product: this.product,
      qty: this.qty,
      selectedSize: this.selectedSize,
      selectedColor: this.selectedColor
    });

    // 🔥 force update header via storage event trick
    window.dispatchEvent(new Event('storage'));

    alert('Added to cart!');

    this.router.navigate(['/cart']);
  }

  // =========================
  // QTY CONTROL
  // =========================
  increaseQty(): void {
    this.qty++;
  }

  decreaseQty(): void {
    if (this.qty > 1) {
      this.qty--;
    }
  }

  // =========================
  // IMAGE
  // =========================
  selectImage(img: string): void {
    this.selectedImage = img;
  }

  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

  // =========================
  // ZOOM DESKTOP
  // =========================
  onMouseMove(event: MouseEvent): void {

    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    this.zoomActive = true;

    this.cursorX = x;
    this.cursorY = y;

    this.zoomPosition = {
      backgroundPosition: `${xPercent}% ${yPercent}%`
    };
  }

  // =========================
  // ZOOM MOBILE
  // =========================
  onTouchMove(event: TouchEvent): void {

    const touch = event.touches[0];
    if (!touch) return;

    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    this.zoomActive = true;

    this.cursorX = x;
    this.cursorY = y;

    this.zoomPosition = {
      backgroundPosition: `${xPercent}% ${yPercent}%`
    };
  }

  resetZoom(): void {
    this.zoomActive = false;
  }

  // =========================
  // STARS
  // =========================
  getStars(rating: number): number[] {
    return Array(Math.round(rating || 0)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    const r = Math.round(rating || 0);
    return Array(5 - r > 0 ? 5 - r : 0).fill(0);
  }

  buyNow(): void {

    // 1. Masukkan item ke cart dulu
    this.cartService.addToCart({
      product: this.product,
      qty: this.qty,
      selectedSize: this.selectedSize,
      selectedColor: this.selectedColor
    });

    // 2. update header count
    window.dispatchEvent(new Event('storage'));

    // 3. langsung ke checkout page
    this.router.navigate(['/cart/checkout']);
  }
  shareProduct(): void {
    const url = window.location.href;
    const text = `Check this product: ${this.product.title} - $${this.product.price}`;

    if (navigator.share) {
      navigator.share({
        title: this.product.title,
        text: text,
        url: url
      });
      return;
    }

    navigator.clipboard.writeText(url).then(() => {
      alert('Product link copied to clipboard!');
    });
  }

  shareWhatsApp(): void {
    const url = window.location.href;
    const text = `Check this product: ${this.product.title} - ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  shareFacebook(): void {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }

}