export interface Garment {
  garment_id: number;
  order_id: number;
  garment_type_id: number;
  fabric_id: number;
  quantity: number;
  person_name?: string;
  details: string;
  img?: string;
  measures: string; 
}