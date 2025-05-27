export interface Payment {
  payment_id: number;
  order: number;
  amount: number;
  payment_date: string;
  payment_method: "efectivo" | "transferencia" | "tarjeta" | "otro";
  description: string;
}
