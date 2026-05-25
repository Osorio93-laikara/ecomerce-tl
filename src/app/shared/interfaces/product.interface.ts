export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  size?: string;
  stock?: number;
  description?: string;
  colors?: string[];

  discount?: number;

  // 🔥 PROMO
  promoTitle?: string;
  promoSubtitle?: string;
  promoClass?: string;
  alignRight?: boolean;
}

export interface CartItem {
  product: Product;
  qty: number;
  selectedSize?: string;
  selectedColor?: string;
}