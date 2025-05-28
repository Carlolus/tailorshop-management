export interface Order {
  order_id: number;
  customer_id: number;
  order_date: string; 
  delivery_date: string;    
  status: 'pendiente' | 'en proceso' | 'terminado' | 'entregado';
  price: number;
  balance: number;
  createdAt?: string;      
  updatedAt?: string;
}
