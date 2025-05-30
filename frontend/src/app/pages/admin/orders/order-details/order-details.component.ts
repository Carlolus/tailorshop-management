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
import { Garment } from '../../../../core/models/garment.model'; // Asegúrate que la ruta sea correcta
import { Fabric } from '../../../../core/models/fabric.model'; // Asegúrate que la ruta sea correcta
import { GarmentType } from '../../../../core/models/garment-type.model'; // Asegúrate que la ruta sea correcta
import { Payment } from '../../../../core/models/payment.model'; // Asegúrate que la ruta sea correcta

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
  garments: Array<{ // Esta es la estructura que debemos llenar
    id: string; // garment_id de Garment, convertido a string
    quantity: number; // quantity de Garment
    garment_type_id: string; // garment_type_id de Garment, convertido a string
    garment_type_name: string; // Nombre obtenido usando garment_type_id
    fabric_id: string;
    fabric_name: string;
    person_name: string; // person_name de Garment
    measures: string; // measures de Garment (o details, según tu lógica)
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
  garments: Garment[] = []; // Aquí se cargarán las prendas desde el servicio
  payments: Payment[] = [];
  fabrics: Fabric[] = [];
  garmentTypes: GarmentType[] = []; // Aquí se cargarán los tipos de prenda


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
      setTimeout(async () => { // Mantengo el setTimeout por si tienes alguna razón específica para ello

        this.order = await firstValueFrom(this.orderService.getOrderById(this.orderId));
        if (this.order) {
          console.log("Orden existe, obteniendo información...");
          this.customer = await firstValueFrom(this.customerService.getCustomerById(this.order.customer_id));
          console.log("Cliente: ", this.customer);

          // 1. Cargar las prendas de la orden
          this.garments = await firstValueFrom(this.garmentService.getGarmentsByOrderId(this.orderId));
          console.log("Prendas de la orden: ", this.garments);

          this.payments = await firstValueFrom(this.paymentService.getPaymentsByOrderId(this.orderId));
          console.log("Pagos de la orden: ", this.payments)

          // 2. Cargar todos los tipos de prenda (para poder buscar el nombre por ID)
          this.garmentTypes = await firstValueFrom(this.garmentTypeService.getGarmentTypes());
          console.log("Tipos de prenda cargados: ", this.garmentTypes);

          // 3. Cargar las telas (aunque no se usan directamente en orderData.garments, ya lo tenías)
          this.fabrics = await firstValueFrom(this.fabricService.getFabrics()); // Asumo que tienes un método así o ajusta según sea necesario
          console.log("Telas cargadas: ", this.fabrics);


          this.orderData = {
            id: this.orderId,
            created_date: this.order.order_date,
            delivery_date: this.order.delivery_date,
            status: this.order.status as OrderData['status'], // Asegurar el tipo
            price: this.order.price,
            balance: this.order.balance,
            client: {
              name: this.customer?.name || 'N/A', // Añadir fallback por si customer es undefined
              phone: this.customer?.phone || 'N/A',
              email: this.customer?.mail || 'NA',
              address: this.customer?.address || 'NA',
            },
            // --- MODIFICACIÓN PRINCIPAL AQUÍ ---
            garments: this.garments.map(garment => {
              const garmentTypeName = this.getGarmentTypeName(garment.garment_type_id);
              const fabric_name = this.getFabricName(garment.fabric_id);
              return {
                id: garment.garment_id.toString(), // Convertir number a string
                quantity: garment.quantity,
                garment_type_id: garment.garment_type_id.toString(), // Convertir number a string
                garment_type_name: garmentTypeName,
                fabric_id: garment.fabric_id.toString(),
                fabric_name: fabric_name,
                person_name: garment.person_name || '', // Usar valor de Garment o un default
                measures: garment.measures || garment.details || 'No especificadas' // Usar garment.measures o garment.details como fallback
              };
            }),
          };
          console.log("OrderData construida: ", this.orderData);
        } else {
          console.error("La orden no fue encontrada.");
        }
        this.isLoading = false;
      }, 1000);
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
    if (!this.fabrics || this.fabrics.length === 0) { // Asegúrate que fabrics esté cargado
      // console.warn("Fabrics array is not loaded or is empty. Cannot get fabric name for ID:", fabric_id);
      return 'N/A';
    }
    const fabric = this.fabrics.find(f => f.fabric_id === fabric_id);
    return fabric ? fabric.fabric_name : 'N/A';
  }

  getGarmentTypeName(garment_type_id: number): string {
    if (!this.garmentTypes || this.garmentTypes.length === 0) { // Asegúrate que garmentTypes esté cargado
      // console.warn("GarmentTypes array is not loaded or is empty. Cannot get garment type name for ID:", garment_type_id);
      return 'Tipo Desconocido';
    }
    const garmentType = this.garmentTypes.find(gt => gt.garment_type_id === garment_type_id);
    return garmentType ? garmentType.name : 'Tipo Desconocido'; // Retorna un default más descriptivo
  }

  getPaymentPercentage(): number {
    if (!this.orderData || this.orderData.price === 0) { // Evitar división por cero
      return 0;
    }
    // El balance es lo que falta por pagar. Si quieres el porcentaje pagado:
    // const paidAmount = this.orderData.price - this.orderData.balance;
    // return Math.round((paidAmount / this.orderData.price) * 100);
    // Si 'balance' representa lo ya pagado (debería llamarse 'paid_amount' o similar):
    return Math.round((this.orderData.balance / this.orderData.price) * 100); // Asumiendo que 'balance' es lo pagado
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
    // Abrir en nueva pestaña
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['admin/garments/', garmentId])
    );
    window.open(url, '_blank');
  }

  onEditGarment(garmentId: string): void {
    console.log('Editar prenda ID:', garmentId);
    // Aquí puedes implementar la lógica para la edición,
    // por ejemplo, navegar a una ruta de edición de prenda o abrir un formulario en un diálogo.
    // this.router.navigate(['/orders', this.orderId, 'garments', garmentId, 'edit']);
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