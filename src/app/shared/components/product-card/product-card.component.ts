import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist.service';


export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;

  isWishlisted = false;

  constructor(
    private router: Router,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {

    // cek apakah sudah pernah like
    this.isWishlisted =
      this.wishlistService.isWishlisted(this.product.id);
  }

  goDetail() {
    this.router.navigate(['/product', this.product.id]);
  }

  addToCart(event: Event) {

    event.stopPropagation();

    console.log('add to cart', this.product);
  }

  toggleWishlist(event: Event) {

    event.stopPropagation();

    // simulate API save
    this.wishlistService.toggleWishlist(this.product.id);

    // update UI
    this.isWishlisted =
      this.wishlistService.isWishlisted(this.product.id);
  }

}