export interface Customer {
  customer_id: number;
  name: string;
  phone: string;
  address?: string | null;
  mail?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerForOrder {
  name: string;
  phone: string;
  address?: string | null;
  mail?: string | null;
}

