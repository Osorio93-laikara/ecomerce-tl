import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  // simulate database/API
  private wishlistIds: number[] = [];

  toggleWishlist(productId: number) {

    const exists =
      this.wishlistIds.includes(productId);

    if (exists) {

      this.wishlistIds =
        this.wishlistIds.filter(id => id !== productId);

      console.log('REMOVE FROM API:', productId);

    } else {

      this.wishlistIds.push(productId);

      console.log('SAVE TO API:', productId);
    }

    console.log('CURRENT DATA:', this.wishlistIds);
  }

  isWishlisted(productId: number): boolean {

    return this.wishlistIds.includes(productId);
  }

}