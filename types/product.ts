export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  deeplink: string;

  price: number;
  old_price: number;

  category: string;
  store: string;

  in_stock: boolean;
}