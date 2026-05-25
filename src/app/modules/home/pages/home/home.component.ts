import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  categories: string[] = [];

  selectedCategory: string = 'All';

  filteredProducts: Product[] = [];
  visibleProducts: Product[] = [];

  // SEARCH
  searchTerm: string = '';

  // PRICE RANGE
  minSelected: number = 0;
  maxSelected: number = 3000;

  // SORT
  sortBy: string = 'default';

  // LOADING
  loading: boolean = true;

  // PAGINATION
  pageSize: number = 4;
  currentPage: number = 1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(res => {

      this.products = res;

      this.categories = [
        'All',
        ...new Set(res.map(p => p.category))
      ];

      this.applyFilter();

      this.loading = false;
    });
  }

  // =========================
  // FILTER CORE
  // =========================
  applyFilter(): void {

    let filtered = [...this.products];

    // CATEGORY
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // SEARCH
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // PRICE RANGE
    filtered = filtered.filter(p =>
      p.price >= this.minSelected &&
      p.price <= this.maxSelected
    );

    // SORT
    switch (this.sortBy) {

      case 'low':
        filtered.sort((a, b) => a.price - b.price);
        break;

      case 'high':
        filtered.sort((a, b) => b.price - a.price);
        break;

      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    this.filteredProducts = filtered;

    this.currentPage = 1;
    this.updateVisibleProducts();
  }

  // =========================
  // PAGINATION
  // =========================
  updateVisibleProducts(): void {
    this.visibleProducts = this.filteredProducts.slice(
      0,
      this.pageSize * this.currentPage
    );
  }

  loadMore(): void {
    this.currentPage++;
    this.updateVisibleProducts();
  }

  // =========================
  // CATEGORY
  // =========================
  selectCategory(cat: string): void {
    this.selectedCategory = cat;
    this.applyFilter();
  }

  // =========================
  // RANGE UI
  // =========================
  getRangeBackground(value: number): string {

    const percent = (value / 3000) * 100;

    return `
      linear-gradient(
        to right,
        #03ac0e 0%,
        #03ac0e ${percent}%,
        #e5e7eb ${percent}%,
        #e5e7eb 100%
      )
    `;
  }

  // =========================
  // ICON
  // =========================
  getIcon(cat: string): string {

    switch (cat) {

      case 'Phone':
        return 'pi pi-mobile';

      case 'Laptop':
        return 'pi pi-desktop';

      case 'Wearable':
        return 'pi pi-clock';

      case 'Tablet':
        return 'pi pi-tablet';

      default:
        return 'pi pi-box';
    }
  }

  // =========================
  // SLIDES
  // =========================
  slides = [
    {
      title: 'Discover Your Style',
      subtitle: 'Premium fashion collection for modern lifestyle.',
      button: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
    },
    {
      title: 'Summer Collection',
      subtitle: 'Fresh style and trending outfit this season.',
      button: 'Explore',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050'
    },
    {
      title: 'Big Sale 70% OFF',
      subtitle: 'Special discount only for today.',
      button: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b'
    }
  ];
}