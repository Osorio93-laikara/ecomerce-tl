import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styleUrl: './page-categories.component.scss'
})
export class PageCategoriesComponent implements OnInit {

  products: Product[] = [];
  categories: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => {

      this.products = data;

      this.categories = [...new Set(
        data.map(item => item.category)
      )];

    });

  }

  getCategoryImage(category: string): string {

    const found = this.products.find(
      p => p.category === category
    );

    return found?.image || '';

  }

  getTotal(category: string): number {

    return this.products.filter(
      p => p.category === category
    ).length;

  }

}{

}
