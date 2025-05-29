import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';


// Steps component
import { Step1CustomerComponent } from './steps/step1-customer/step1-customer.component';
import { Step2OrderComponent } from './steps/step2-order/step2-order.component';
import { Step3GarmentsComponent } from './steps/step3-garments/step3-garments.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog.component';

// Models
import { Customer } from '../../../../core/models/customer.model';
import { Order } from '../../../../core/models/order.model';
import { Garment } from '../../../../core/models/garment.model';
import { GarmentType } from '../../../../core/models/garment-type.model';

// Services
import { CustomerService } from '../../../../core/services/customers/customers.service';
import { GarmentService } from '../../../../core/services/garment/garment.service';
import { OrderService } from '../../../../core/services/orders/order.service';
import { PaymentService } from '../../../../core/services/payments/payment.service';
import { GarmentTypeService } from '../../../../core/services/garment-types/garment-types.service';

// Angular Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from './dialogs/success-dialog.component';

type OrderDetails = Omit<Order, 'order_id' | 'createdAt' | 'updatedAt'>;

@Component({
  selector: 'app-order-creation',
  standalone: true,
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    Step1CustomerComponent,
    Step2OrderComponent,
    Step3GarmentsComponent,
    MatIcon
  ]
})
export class OrderCreationComponent {
  clienteForm: FormGroup;
  ordenForm: FormGroup;
  prendasForm: FormGroup;
  clienteExistenteData?: Customer;
  garmentTypes: GarmentType[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private orderService: OrderService,
    private garmentService: GarmentService,
    private router: Router,
    private paymentService: PaymentService,
    private garmentTypeService: GarmentTypeService
  ) {
    this.clienteForm = this.fb.group({
      clienteValido: [false, Validators.requiredTrue]
    });

    this.ordenForm = this.fb.group({
      ordenValida: [false, Validators.requiredTrue],
      fechaEntrega: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      abono: [0]
    });

    this.prendasForm = this.fb.group({
      prendasValidas: [false, Validators.requiredTrue]
    });
  }

  clienteExistenteId: number | null = null;
  clienteNuevo: Customer | null = null;
  pasoClienteValido = false;

  orderDetails: OrderDetails | null = null;
  pasoOrdenValido = false;

  garmentsData: Garment[] | null = null;
  pasoPrendasValido = false;

  procesarCliente(event: { tipo: 'nuevo'; data: Customer } | { tipo: 'existente'; id: number } | null) {
    if (!event) {
      this.clienteExistenteId = null;
      this.clienteNuevo = null;
      this.pasoClienteValido = false;
      this.clienteForm.patchValue({ clienteValido: false });
      return;
    }

    if (event.tipo === 'nuevo') {
      this.clienteNuevo = {
        ...event.data,
        customer_id: 0
      } as Customer;
      this.clienteExistenteId = null;
      this.pasoClienteValido = true;
      console.log('Nuevo cliente preparado:', this.clienteNuevo);
    } else {
      this.clienteExistenteId = event.id;
      this.clienteNuevo = null;
      this.pasoClienteValido = true;
      console.log('Cliente existente seleccionado ID:', this.clienteExistenteId);
    }

    this.clienteForm.patchValue({ clienteValido: true });
  }

  procesarOrden(orderDetails: OrderDetails | null) {
    this.loadGarmentTypes();
    this.orderDetails = orderDetails;
    this.pasoOrdenValido = !!orderDetails;

    this.ordenForm.patchValue({
      ordenValida: !!orderDetails,
      fechaEntrega: orderDetails?.delivery_date || '',
      precio: orderDetails?.price || 0,
      abono: orderDetails?.balance || 0
    });

    if (orderDetails) {
      //console.log('Detalles de orden válidos:', orderDetails);
    }
  }

  procesarPrendas(garments: any[] | null) {
    if (garments && garments.length > 0) {
      this.garmentsData = garments.map(garment => ({
        ...garment,
        garment_id: garment.garment_id || 0,
        order_id: garment.order_id || 0
      })) as Garment[];

      this.pasoPrendasValido = true;
      this.prendasForm.patchValue({ prendasValidas: true });
      //console.log('Datos de prendas válidos:', this.garmentsData);
    } else {
      this.garmentsData = null;
      this.pasoPrendasValido = false;
      this.prendasForm.patchValue({ prendasValidas: false });
    }
  }

  confirmOrder() {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.sendOrder();
      }
    });
  }

  async sendOrder() {
    //console.log('=== CONFIRMANDO ORDEN ===');

    if (!this.pasoClienteValido || !this.pasoOrdenValido || !this.pasoPrendasValido) {
      //console.warn('Faltan datos válidos en uno or más pasos para confirmar la orden.');
      return;
    }

    try {
      let customerId: number;
      if (this.clienteNuevo) {
        //console.log('Creando nuevo cliente:', this.clienteNuevo);
        const camposSeleccionados = {
          name: this.clienteNuevo?.name,
          phone: this.clienteNuevo?.phone,
          mail: this.clienteNuevo?.mail,
          address: this.clienteNuevo?.address
        };

        const newCustomer = await firstValueFrom(this.customerService.createCustomer(camposSeleccionados));

        if (!newCustomer || !newCustomer.customer_id) {
          throw new Error('Error al crear el cliente: respuesta inválida del servidor');
        }

        customerId = newCustomer.customer_id;
        //console.log('Nuevo cliente creado con ID:', customerId);

      } else if (this.clienteExistenteId) {
        //console.log('Usando cliente existente ID:', this.clienteExistenteId);

        customerId = this.clienteExistenteId;
      } else {
        throw new Error('No se encontró información válida del cliente');
      }

      if (this.orderDetails) {
        this.orderDetails.customer_id = customerId;

        //console.log('Creando orden con detalles:', this.orderDetails);

        const camposSeleccionados = {
          customer_id: this.orderDetails?.customer_id,
          order_date: this.orderDetails?.order_date,
          delivery_date: this.orderDetails?.delivery_date,
          price: this.orderDetails?.price,
          balance: this.orderDetails?.price,
          status: this.orderDetails?.status
        };

        const newOrder = await firstValueFrom(this.orderService.createOrder(camposSeleccionados));

        if (!newOrder || !newOrder.order_id) {
          throw new Error('Error al crear la orden: respuesta inválida del servidor');
        }

        const orderId = newOrder.order_id;
        //console.log('Nueva orden creada con ID:', orderId);

        if (this.orderDetails.balance > 0) {
          const currentDate = new Date();
          const payment = await firstValueFrom(this.paymentService.createPayment(
            {
              order_id: orderId,
              amount: this.orderDetails.balance,
              payment_date: currentDate.toISOString().split('T')[0],
              payment_method: 'efectivo',
              description: 'Abono inicial'
            }
          ));

          if (!payment) {
            throw new Error('Error al realizar el pago inicial: respuesta inválida del servidor');
          }
        }

        if (this.garmentsData && this.garmentsData.length > 0) {
          //console.log('Creando prendas para la orden...');
          //console.log("Datos a cargar: ", this.garmentsData);

          const garmentPromises = this.garmentsData.map(garment => {
            const camposSeleccionadosGarment = {
              order_id: orderId,
              garment_type_id: garment?.garment_type_id,
              fabric_id: garment?.fabric_id,
              quantity: garment?.quantity,
              person_name: garment?.person_name,
              details: garment?.details,
              img: garment?.img,
              measures: garment?.measures
            };

            return this.garmentService.createGarment(camposSeleccionadosGarment).toPromise();
          });

          const createdGarments = await Promise.all(garmentPromises);

          //console.log('Prendas creadas exitosamente:', createdGarments);
          //console.log('=== ORDEN CONFIRMADA EXITOSAMENTE ===');

        } else {
          throw new Error('No se encontraron datos válidos de prendas');
        }
      } else {
        throw new Error('No se encontraron detalles válidos de la orden');
      }

    } catch (error) {
      console.error('Error al confirmar la orden:', error);
    }
    this.dialog.open(SuccessDialogComponent).afterClosed().subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }


  getClienteInfo(): string {
    if (this.clienteNuevo) {
      return `${this.clienteNuevo.name} - ${this.clienteNuevo.phone} (Nuevo cliente)`;
    } else if (this.clienteExistenteId) {
      if (!this.clienteExistenteData || this.clienteExistenteData.customer_id !== this.clienteExistenteId) {
        this.customerService.getCustomerById(this.clienteExistenteId).subscribe({
          next: (customer) => {
            this.clienteExistenteData = customer;
          },
          error: (err) => {
            console.error('Error loading existing customer data:', err);
            this.clienteExistenteData = undefined;
          }
        });
        return `Cargando información del cliente...`;
      }
      return `${this.clienteExistenteData.name} - ${this.clienteExistenteData.phone} (Cliente existente)`;
    }
    return 'No hay cliente seleccionado';
  }

  loadGarmentTypes() {
    this.garmentTypeService.getGarmentTypes().subscribe({
      next: (garmentTypes) => {
        this.garmentTypes = garmentTypes;
      },
      error: (error) => {
        console.error('Error loading garment types:', error);
      }
    });
  }

  getGarmentTypeName(id: number): string {
    const garmentType = this.garmentTypes.find(type => type.garment_type_id === id);
    return garmentType?.name || 'Desconocido';
  }
}