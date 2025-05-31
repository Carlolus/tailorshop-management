import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { EditCustomerDialogComponent } from './edit-client/edit-customer-dialog.component';
import { EditOrderDialogComponent } from './edit-order/edit-order-dialog.component';
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
import { DialogService } from '../../../../core/services/dialog.service';
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
    MatMenuModule,
    MatNativeDateModule
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
  canPay: boolean = true;


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
    private paymentService: PaymentService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.orderId = +(this.route.snapshot.paramMap.get('id') || '');
    this.loadOrderData();
  }

  private async loadOrderData(): Promise<void> {
    if (!isNaN(this.orderId)) {
      setTimeout(async () => {

        this.order = await firstValueFrom(this.orderService.getOrderById(this.orderId));
        if (this.order) {
          if(this.order.balance == 0){
            this.canPay = false;
          }
          this.customer = await firstValueFrom(this.customerService.getCustomerById(this.order.customer_id));
          this.garments = await firstValueFrom(this.garmentService.getGarmentsByOrderId(this.orderId));

          this.payments = await firstValueFrom(this.paymentService.getPaymentsByOrderId(this.orderId));

          this.garmentTypes = await firstValueFrom(this.garmentTypeService.getGarmentTypes());

          this.fabrics = await firstValueFrom(this.fabricService.getFabrics());

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
        } else {
          console.error("La orden no fue encontrada.");
        }
        this.isLoading = false;
      }, 500);
    } else {
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
    return Math.round((this.orderData.price - this.orderData.balance)/this.orderData.price * 100);
  }

  onBack(): void {
    this.router.navigate(['admin/orders']);
  }


  onAddPayment(): void {
    this.router.navigate(['admin/finance/payments/new', this.orderId]);
  }

  onViewGarmentDetails(garmentId: string): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['admin/garments/', garmentId])
    );
    window.open(url, '_blank');
  }

  onEditGarment(garmentId: string): void {
    this.router.navigate(['/admin/garments/edit', garmentId]);
  }

  onAddGarment(): void {
    this.router.navigate(['/admin/garments/new', this.order?.order_id]);
  }

  onEditClient(): void {
    const dialogRef = this.dialog.open(EditCustomerDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const orderToUpdate = {
          order_id: this.orderData.id,
          customer_id: result.customer_id,
          order_date: this.orderData.created_date,
          delivery_date: this.orderData.delivery_date,
          status: this.orderData.status,
          price: this.orderData.price,
          balance: this.orderData.balance
        }
        this.orderService.updateOrder(orderToUpdate).subscribe({
          next: () => {
            this.orderData.client = result;
            this.loadOrderData();
          },
          error: err => {
            console.error('Error actualizando cliente:', err);
          }
        });
      }
    });
  }

  onEditOrder(): void {
    const dialogRef = this.dialog.open(EditOrderDialogComponent, {
      width: '600px',
      data: { order_id: this.orderData.id },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateOrder(result).subscribe({
          next: () => {
            this.loadOrderData();
          },
          error: err => {
            console.error('Error actualizando order:', err);
          }
        });
      }
    });
  }

  confirmDeleteOrder(order_id: number) {
    this.dialogService.confirm(
      'Eliminar',
      '¿Está seguro de eliminar esta orden?'
    ).then(confirmed => {
      if (confirmed) this.deleteOrder(order_id);
    });
  }

  deleteOrder(order_id: number): void {
    this.orderService.deleteOrder(order_id).subscribe({
      next: () => {
        this.dialogService.notify(
          'Eliminación Exitosa', // Título
          `La orden No. ${order_id} ha sido eliminada correctamente.`, // Mensaje
          'success' // Tipo de notificación
        );
        // Aquí iría tu navegación, por ejemplo:
        this.router.navigate(['/admin/orders']); 
      },
      error: (err) => {
        this.dialogService.notify(
          'Error al Eliminar', // Título
          `No se pudo eliminar la orden No. ${order_id}. Debido a las referencias existentes.`, // Mensaje
          'error' // Tipo de notificación
        );
      }
    });
  }


  confirmDelete(garmentId: string) {
    this.dialogService.confirm(
      'Eliminar',
      '¿Está seguro de eliminar esta prenda?'
    ).then(confirmed => {
      if (confirmed) this.deleteGarment(garmentId);
    });
  }

  deleteGarment(garmentId: string): void {
    this.garmentService.deleteGarment(+(garmentId)).subscribe({
      next: () => {
        this.orderData.garments = this.orderData.garments.filter(g => g.id !== garmentId);
      },
      error: (err) => console.error('Error al eliminar la prenda', err)
    });
  }

}