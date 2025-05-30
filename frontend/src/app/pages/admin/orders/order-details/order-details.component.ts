import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

// Models
import { Order } from '../../../../core/models/order.model';
import { Customer } from '../../../../core/models/customer.model';
import { Garment } from '../../../../core/models/garment.model'; 
import { Fabric } from '../../../../core/models/fabric.model';
import { GarmentType } from '../../../../core/models/garment-type.model'; 
import { Payment } from '../../../../core/models/payment.model'; 

// Services
import { OrderService } from '../../../../core/services/orders/order.service';
import { CustomerService } from '../../../../core/services/customers/customers.service';
import { GarmentService } from '../../../../core/services/garment/garment.service';
import { FabricService } from '../../../../core/services/fabrics/fabric.service';
import { GarmentTypeService } from '../../../../core/services/garment-types/garment-types.service';
import { PaymentService } from '../../../../core/services/payments/payment.service';
import { firstValueFrom } from 'rxjs';


export interface OrderData {
  id: number;
  created_date: string;
  delivery_date: string;
  status: 'pendiente' | 'en proceso' | 'terminado' | 'entregado';
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
    fabric_id: string;
    fabric_name: string;
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
    MatChipsModule,
    MatMenuModule
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderData!: OrderData;
  order: Order | undefined;
  customer: Customer | undefined;
  garments: Garment[] = []; 
  payments: Payment[] = [];
  fabrics: Fabric[] = [];
  garmentTypes: GarmentType[] = [];


  orderId!: number;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fabricService: FabricService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private garmentService: GarmentService,
    private garmentTypeService: GarmentTypeService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.orderId = +(this.route.snapshot.paramMap.get('id') || '');
    console.log("Receipt ID: ", this.orderId)
    this.loadOrderData();
  }

  private async loadOrderData(): Promise<void> {
    if (!isNaN(this.orderId)) {
      setTimeout(async () => {

        this.order = await firstValueFrom(this.orderService.getOrderById(this.orderId));
        if (this.order) {
          console.log("Orden existe, obteniendo información...");
          this.customer = await firstValueFrom(this.customerService.getCustomerById(this.order.customer_id));
          console.log("Cliente: ", this.customer);

          this.garments = await firstValueFrom(this.garmentService.getGarmentsByOrderId(this.orderId));
          console.log("Prendas de la orden: ", this.garments);

          this.payments = await firstValueFrom(this.paymentService.getPaymentsByOrderId(this.orderId));
          console.log("Pagos de la orden: ", this.payments)

          this.garmentTypes = await firstValueFrom(this.garmentTypeService.getGarmentTypes());
          console.log("Tipos de prenda cargados: ", this.garmentTypes);

          this.fabrics = await firstValueFrom(this.fabricService.getFabrics());
          console.log("Telas cargadas: ", this.fabrics);

          this.orderData = {
            id: this.orderId,
            created_date: this.order.order_date,
            delivery_date: this.order.delivery_date,
            status: this.order.status as OrderData['status'],
            price: Math.round(this.order.price),
            balance: Math.round(this.order.balance),
            client: {
              name: this.customer?.name || 'N/A', 
              phone: this.customer?.phone || 'N/A',
              email: this.customer?.mail || 'NA',
              address: this.customer?.address || 'NA',
            },
            garments: this.garments.map(garment => {
              const garmentTypeName = this.getGarmentTypeName(garment.garment_type_id);
              const fabric_name = this.getFabricName(garment.fabric_id);
              return {
                id: garment.garment_id.toString(),
                quantity: garment.quantity,
                garment_type_id: garment.garment_type_id.toString(), 
                garment_type_name: garmentTypeName,
                fabric_id: garment.fabric_id.toString(),
                fabric_name: fabric_name,
                person_name: garment.person_name || '', 
                measures: garment.measures || garment.details || 'No especificadas'
              };
            }),
          };
          console.log("OrderData construida: ", this.orderData);
        } else {
          console.error("La orden no fue encontrada.");
        }
        this.isLoading = false;
      }, 500);
    } else {
      console.error("ID de orden inválido.");
      this.isLoading = false;
    }
  }

  getStatusClass(status: string): string {
    const statusMapping: { [key: string]: string } = {
      'pendiente': 'pending',
      'en proceso': 'in_progress',
      'terminado': 'completed',
      'entregado': 'entregado',
      'cancelled': 'cancelled'
    };
    return `status-${statusMapping[status] || status}`;
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'pendiente': 'hourglass_empty',
      'en proceso': 'autorenew',
      'terminado': 'check_circle',
      'entregado': 'local_shipping',
      'pending': 'hourglass_empty',
      'in_progress': 'autorenew',
      'completed': 'check_circle',
      'cancelled': 'cancel'
    };
    return icons[status as keyof typeof icons] || 'help';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'pendiente': 'Pendiente',
      'en proceso': 'En proceso',
      'terminado': 'Terminada',
      'entregado': 'Entregada',
      'pending': 'Pendiente',
      'in_progress': 'En proceso',
      'completed': 'Completada',
      'cancelled': 'Cancelada'
    };
    return labels[status as keyof typeof labels] || 'Desconocido';
  }

  getFabricName(fabric_id: number): string {
    if (!this.fabrics || this.fabrics.length === 0) {
      return 'N/A';
    }
    const fabric = this.fabrics.find(f => f.fabric_id === fabric_id);
    return fabric ? fabric.fabric_name : 'N/A';
  }

  getGarmentTypeName(garment_type_id: number): string {
    if (!this.garmentTypes || this.garmentTypes.length === 0) { 
      return 'Tipo Desconocido';
    }
    const garmentType = this.garmentTypes.find(gt => gt.garment_type_id === garment_type_id);
    return garmentType ? garmentType.name : 'Tipo Desconocido'; 
  }

  getPaymentPercentage(): number {
    if (!this.orderData || this.orderData.price === 0) { 
      return 0;
    }
    return Math.round((this.orderData.balance / this.orderData.price) * 100);
  }

  onBack(): void {
    this.router.navigate(['/orders']);
  }

  onEdit(): void {
    this.router.navigate(['/orders', this.orderId, 'edit']);
  }

  onPrint(): void {
    window.print();
  }

  onViewGarmentDetails(garmentId: string): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['admin/garments/', garmentId])
    );
    window.open(url, '_blank');
  }

  onEditGarment(garmentId: string): void {
    console.log('Editar prenda ID:', garmentId);
    this.router.navigate(['/admin/garments/edit/',garmentId])
  }

  onDeleteGarment(garmentId: string): void {
    console.log('Eliminar prenda ID:', garmentId);
    // Aquí implementas la lógica para eliminar la prenda.
    // Es MUY RECOMENDABLE pedir confirmación al usuario antes de eliminar.
    // const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta prenda? Esta acción no se puede deshacer.');
    // if (confirmDelete) {
    //   this.garmentService.deleteGarment(garmentId).subscribe({
    //     next: () => {
    //       console.log('Prenda eliminada con éxito');
    //       // Actualizar la UI: remover la prenda de this.orderData.garments
    //       this.orderData.garments = this.orderData.garments.filter(g => g.id !== garmentId);
    //       // Opcionalmente, recargar los datos de la orden si hay cálculos dependientes
    //       // this.loadOrderData();
    //     },
    //     error: (err) => console.error('Error al eliminar la prenda', err)
    //   });
    // }
  }
}