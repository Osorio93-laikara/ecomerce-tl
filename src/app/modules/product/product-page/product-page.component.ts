import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../core/services/product.service';

import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  categories: string[] = [];
  sizes: string[] = [];
  colors: string[] = [];

  selectedCategory = 'All';
  selectedSize = 'All';
  selectedColor = 'All';

  searchTerm = '';
  sortOption = 'default';

  maxPrice = 3000;

  showCategories = true;
  showPrice = true;
  showSizes = true;
  showColors = true;

  viewMode: '4' | '3' | '2' = '4';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => {

      this.products = data;

      this.categories = [...new Set(
        data.map(p => p.category)
      )];

      this.sizes = [...new Set(
        data.map(p => p.size).filter(Boolean) as string[]
      )];

      this.colors = [...new Set(
        data.flatMap(p => p.colors || [])
      )];

      // 🔥 ambil category dari URL
      this.route.queryParams.subscribe(params => {

        const category = params['category'];

        if (category) {
          this.selectedCategory = category;
        } else {
          this.selectedCategory = 'All';
        }

        this.applyFilters();

      });

    });
  }

  // 🔥 FILTER CHANGE
  onFilterChange(): void {

    // update URL category
    if (this.selectedCategory === 'All') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          category: null
        },
        queryParamsHandling: 'merge'
      });

    } else {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          category: this.selectedCategory
        },
        queryParamsHandling: 'merge'
      });

    }

    this.applyFilters();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // 🔥 RESET CATEGORY
  resetCategory(): void {

    this.selectedCategory = 'All';

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: null
      },
      queryParamsHandling: 'merge'
    });

    this.applyFilters();
  }

  applyFilters(): void {

    let result = [...this.products];

    // CATEGORY
    if (this.selectedCategory !== 'All') {
      result = result.filter(
        p => p.category === this.selectedCategory
      );
    }

    // SIZE
    if (this.selectedSize !== 'All') {
      result = result.filter(
        p => p.size === this.selectedSize
      );
    }

    // COLOR
    if (this.selectedColor !== 'All') {
      result = result.filter(
        p => p.colors?.includes(this.selectedColor)
      );
    }

    // PRICE
    result = result.filter(
      p => p.price <= this.maxPrice
    );

    // SORT
    if (this.sortOption === 'low') {
      result.sort((a, b) => a.price - b.price);
    }

    if (this.sortOption === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    // SEARCH
    if (this.searchTerm.trim()) {

      const term = this.searchTerm.toLowerCase();

      result = result.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    }

    this.filteredProducts = result;
  }

  // 🔥 DETAIL
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

  // 🔥 BUY NOW
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

  changeCategory(category: string): void {

    this.selectedCategory = category;

    // 🔥 kalau ALL hapus query param
    if (category === 'All') {

      this.router.navigate(['/products']);

    } else {

      // 🔥 update query param category
      this.router.navigate(
        ['/products'],
        {
          queryParams: {
            category: category
          }
        }
      );

    }

    this.applyFilters();

  }

}