import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

export interface OrderData {
  id: string;
  created_date: string;
  delivery_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  balance: number;
  client: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  garments: Array<{
    id: string;
    quantity: number;
    garment_type_id: string;
    garment_type_name: string;
    person_name: string;
    measures: string;
  }>;
  notes?: string;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderData!: OrderData;
  orderId!: string;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la ruta
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    
    // Simular carga de datos (reemplazar con servicio real)
    this.loadOrderData();
  }

  private loadOrderData(): void {
    // TODO: Reemplazar con llamada al servicio real
    setTimeout(() => {
      this.orderData = {
        id: this.orderId,
        created_date: "2024-05-28T10:30:00",
        delivery_date: "2024-06-15T18:00:00",
        status: "in_progress",
        price: 350000,
        balance: 175000,
        client: {
          name: "María González Rodríguez",
          email: "maria.gonzalez@email.com",
          phone: "+57 300 123 4567",
          address: "Calle 15 #23-45, Barrio Centro, Pasto, Nariño"
        },
        garments: [
          {
            id: "1",
            quantity: 1,
            garment_type_id: "1",
            garment_type_name: "Vestido de novia",
            person_name: "María González",
            measures: "Busto: 90cm, Cintura: 70cm, Cadera: 95cm, Largo: 150cm, Manga: 60cm"
          },
          {
            id: "2",
            quantity: 2,
            garment_type_id: "2",
            garment_type_name: "Vestido de dama de honor",
            person_name: "Ana Martínez",
            measures: "Busto: 85cm, Cintura: 65cm, Cadera: 90cm, Largo: 140cm"
          },
          {
            id: "3",
            quantity: 1,
            garment_type_id: "3",
            garment_type_name: "Traje de novio",
            person_name: "Carlos Pérez",
            measures: "Pecho: 100cm, Cintura: 85cm, Cadera: 95cm, Largo pierna: 110cm"
          }
        ],
        notes: "Entrega urgente para boda el 15 de junio. Contactar 48 horas antes para confirmación de entrega. Color vestidos damas: azul marino."
      };
      this.isLoading = false;
    }, 1000); // Simula delay de carga
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getStatusIcon(status: string): string {
    const icons = {
      'pending': 'hourglass_empty',
      'in_progress': 'autorenew',
      'completed': 'check_circle',
      'cancelled': 'cancel'
    };
    return icons[status as keyof typeof icons] || 'help';
  }

  getStatusLabel(status: string): string {
    const labels = {
      'pending': 'Pendiente',
      'in_progress': 'En proceso',
      'completed': 'Completada',
      'cancelled': 'Cancelada'
    };
    return labels[status as keyof typeof labels] || 'Desconocido';
  }

  getPaymentPercentage(): number {
    return Math.round((this.orderData.balance / this.orderData.price) * 100);
  }

  onBack(): void {
    // Navegar hacia atrás
    this.router.navigate(['/orders']); // Ajusta la ruta según tu estructura
  }

  onEdit(): void {
    // Navegar a edición de orden
    this.router.navigate(['/orders', this.orderId, 'edit']);
  }

  onPrint(): void {
    // Implementar funcionalidad de impresión
    window.print();
  }
}
