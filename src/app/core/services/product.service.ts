import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1,
      title: 'iPhone 15 Pro',
      price: 1200,
      image: 'https://picsum.photos/400/400?1',
      images: [
        'https://picsum.photos/400/400?1',
        'https://picsum.photos/400/400?11',
        'https://picsum.photos/400/400?12'
      ],
      category: 'Phone',
      rating: 5,
      size: '128GB',
      stock: 10,
      description: 'Latest Apple iPhone with A17 Pro chip',
      colors: ['#000000', '#03ac0e', '#ff0000', '#ffffff', '#ffd700'],

      promoTitle: 'New mobile phone',
      promoSubtitle: 'Special for today',
      promoClass: 'mobile',
      alignRight: true,
      discount: 20
    },
    {
      id: 2,
      title: 'MacBook Pro',
      price: 2400,
      image: 'https://picsum.photos/400/400?2',
      images: [
        'https://picsum.photos/400/400?2',
        'https://picsum.photos/400/400?21',
        'https://picsum.photos/400/400?22'
      ],
      category: 'Laptop',
      rating: 5,
      size: '16-inch',
      stock: 5,
      description: 'Powerful laptop with M2 Pro chip',
      colors: ['#000000', '#03ac0e', '#ff0000', '#ffffff', '#ffd700'],

      promoTitle: 'New Laptops',
      promoSubtitle: 'Now starting at $2400',
      promoClass: 'laptops',
      discount: 15
    },
    {
      id: 3,
      title: 'iPad Air',
      price: 600,
      image: 'https://picsum.photos/400/400?3',
      images: [
        'https://picsum.photos/400/400?3',
        'https://picsum.photos/400/400?31',
        'https://picsum.photos/400/400?32'
      ],
      category: 'Tablet',
      rating: 4.5,
      size: '10.9-inch',
      stock: 15,
      description: 'Lightweight tablet with A14 Bionic chip',
      colors: ['#000000', '#03ac0e', '#ff0000', '#ffffff', '#ffd700'],

      promoTitle: 'Summer collection',
      promoSubtitle: 'New Arrivals On Sale',
      promoClass: 'summer',
      alignRight: true,
      discount: 10
    },
    {
      id: 4,
      title: 'iPad Pro',
      price: 1200,
      image: 'https://picsum.photos/400/400?4',
      images: [
        'https://picsum.photos/400/400?4',
        'https://picsum.photos/400/400?41',
        'https://picsum.photos/400/400?42'
      ],
      category: 'Tablet',
      rating: 2,
      size: '12.9-inch',
      stock: 8,
      description: 'High-performance tablet with M1 chip',
      colors: ['#000000', '#03ac0e', '#ff0000', '#ffffff', '#ffd700'],

      promoTitle: 'Shoes for you',
      promoSubtitle: 'Now starting at $89',
      promoClass: 'shoes',
      discount: 15
    },
    {
      id: 5,
      title: 'iMac 24"',
      price: 2400,
      image: 'https://picsum.photos/400/400?5',
      images: [
        'https://picsum.photos/400/400?5',
        'https://picsum.photos/400/400?51',
        'https://picsum.photos/400/400?52'
      ],
      category: 'Desktop',
      rating: 4.8,
      size: '24-inch',
      stock: 3,
      description: 'All-in-one desktop with M1 chip',
      colors: ['#000000', '#03ac0e', '#ff0000', '#ffffff', '#ffd700'],

      promoTitle: 'Popular jewellery brands',
      promoSubtitle: 'Now starting at $1799',
      promoClass: 'jewellery',
      alignRight: true,
      discount: 25
    },
    {
      id: 6,
      title: 'Apple Watch',
      price: 400,
      image: 'https://picsum.photos/400/400?6',
      images: [
        'https://picsum.photos/400/400?6',
        'https://picsum.photos/400/400?61',
        'https://picsum.photos/400/400?62'
      ],
      category: 'Wearable',
      rating: 2.5,
      size: '44mm',
      stock: 20,
      description: 'Smartwatch with health and fitness features',
      colors: ['#000000', '#03ac0e', '#ff0000', '#ffffff', '#ffd700'],

      promoTitle: 'Watch collection',
      promoSubtitle: 'Special for today',
      promoClass: 'watch',
      discount: 5
    },
    {
      id: 7,
      title: 'Apple Watch',
      price: 400,
      image: 'https://picsum.photos/400/400?7',
      images: [
        'https://picsum.photos/400/400?7',
        'https://picsum.photos/400/400?71',
        'https://picsum.photos/400/400?72'
      ],
      category: 'Wearable',
      rating: 2.5,
      size: '44mm',
      stock: 20,
      description: 'Smartwatch with health and fitness features',
      colors: ['#000000', '#03ac0e', '#ff0000', '#ffffff', '#ffd700'],

      promoTitle: 'Watch collection',
      promoSubtitle: 'Special for today',
      promoClass: 'watch',
      discount: 5
    },
    {
      id: 8,
      title: 'Apple Watch',
      price: 400,
      image: 'https://picsum.photos/400/400?8',
      images: [
        'https://picsum.photos/400/400?8',
        'https://picsum.photos/400/400?81',
        'https://picsum.photos/400/400?82'
      ],
      category: 'Wearable',
      rating: 2.5,
      size: '44mm',
      stock: 20,
      description: 'Smartwatch with health and fitness features',
      colors: ['#000000', '#03ac0e', '#ff0000', '#ffffff', '#ffd700'],

      promoTitle: 'Watch collection',
      promoSubtitle: 'Special for today',
      promoClass: 'watch',
      discount: 30
    },
    {
      id: 9,
      title: 'Apple Watch',
      price: 400,
      image: 'https://picsum.photos/400/400?9',
      images: [
        'https://picsum.photos/400/400?9',
        'https://picsum.photos/400/400?91',
        'https://picsum.photos/400/400?92'
      ],
      category: 'Wearable',
      rating: 2.5,
      size: '44mm',
      stock: 20,
      description: 'Smartwatch with health and fitness features',
      colors: ['#000000', '#03ac0e', '#ff0000', '#ffffff', '#ffd700'],

      promoTitle: 'Watch collection',
      promoSubtitle: 'Special for today',
      promoClass: 'watch',
      discount: 10,
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }
}