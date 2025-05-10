export interface CatalogItem {
    item_id: number;
    description: string;
    image: string;
    fabric: number;         // O puedes definir también el objeto fabric si haces join
    type: number;           // Igual con garmentType si haces join
  }