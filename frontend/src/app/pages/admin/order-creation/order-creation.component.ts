import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Steps component

import { Step1CustomerComponent } from './steps/step1-customer/step1-customer.component';
import { Step2OrderComponent } from './steps/step2-order/step2-order.component';
import { Step3GarmentsComponent } from './steps/step3-garments/step3-garments.component';


// Models
import { Customer } from '../../../core/models/customer.model';
import { Order } from '../../../core/models/order.model';
import { Garment } from '../../../core/models/garment.model';
import { Measurement } from '../../../core/models/measurement.model';


// Services
import { CustomerService } from '../../../core/services/customers/customers.service';
import { GarmentService } from '../../../core/services/garment/garment.service';
import { GarmentTypeService } from '../../../core/services/garment-types/garment-types.service';
import { OrderService } from '../../../core/services/orders/order.service';
import { MeasurementService } from '../../../core/services/measurements/measurement.service';


// Angular Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { GarmentType } from '../../../core/models/garment-type.model';

type OrderDetails = Omit<Order, 'order_id' | 'customer_id' | 'createdAt' | 'updatedAt'>;

@Component({
  selector: 'app-order-creation',
  standalone: true,
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material Modules
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

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private orderService: OrderService,
    private garmentTypeService: GarmentTypeService,
    private garmentService: GarmentService,
    private measurementService: MeasurementService

  ) {
    // Form para el paso de cliente - se maneja la validación manualmente
    this.clienteForm = this.fb.group({
      clienteValido: [false, Validators.requiredTrue]
    });


    this.ordenForm = this.fb.group({
      // Form para validar el paso de orden
      ordenValida: [false, Validators.requiredTrue],
      fechaEntrega: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      abono: [0]
    });

    this.prendasForm = this.fb.group({
      // Aquí agregarás los campos del formulario de prendas
      cantidadPrendas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  // Variables para manejar el estado del cliente
  clienteExistenteId: number | null = null;
  clienteNuevo: Customer | null = null;
  pasoClienteValido = false;

  // Variables para manejar el estado de la orden
  orderDetails: OrderDetails | null = null;
  pasoOrdenValido = false;

  // *** NUEVO: Variables para almacenar datos de prendas ***
  garmentsData: Garment[] | null = null;
  measurementsData: Measurement[] | null = null;
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
      this.clienteNuevo = event.data;
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
    this.orderDetails = orderDetails;
    this.pasoOrdenValido = !!orderDetails;

    this.ordenForm.patchValue({
      ordenValida: !!orderDetails,
      fechaEntrega: orderDetails?.delivery_date || '',
      precio: orderDetails?.price || 0,
      abono: orderDetails?.balance || 0
    });

    if (orderDetails) {
      console.log('Detalles de orden válidos:', orderDetails);
    }
  }

  confirmarOrden() {
    console.log('=== CONFIRMANDO ORDEN ===');

    // Validar que hay datos válidos
    if (!this.pasoClienteValido || !this.pasoOrdenValido) {
      console.warn('Faltan datos válidos para confirmar la orden');
      return;
    }

    
    if (this.clienteExistenteId) {
      console.log('Orden con cliente existente:', this.clienteExistenteId);
    } else if (this.clienteNuevo) {
      console.log('Orden con nuevo cliente:', this.clienteNuevo);
    }

    console.log('Detalles de la orden:', this.orderDetails);
    console.log('Datos de las prendas:', this.prendasForm.value);

  }

  procesarPrendas(data: { garments: Garment[], measurements: Measurement[] } | null) {
    if (data) {
      this.garmentsData = data.garments;
      this.measurementsData = data.measurements;
      this.pasoPrendasValido = true;
      this.prendasForm.patchValue({ prendasValidas: true });
      console.log('Prendas recibidas:', this.garmentsData);
      console.log('Medidas recibidas:', this.measurementsData);
    } else {
      this.garmentsData = null;
      this.measurementsData = null;
      this.pasoPrendasValido = false;
      this.prendasForm.patchValue({ prendasValidas: false }); 
      console.log('Datos de prendas no válidos o no recibidos.');
    }
  }

  getClienteInfo(): string {
    if (this.clienteNuevo) {
      return `${this.clienteNuevo.name} - ${this.clienteNuevo.phone} (Nuevo cliente)`;
    } else if (this.clienteExistenteId) {
      if (!this.clienteExistenteData) {
        this.customerService.getCustomerById(this.clienteExistenteId).subscribe(customer => {
          this.clienteExistenteData = customer;
        });
        return `Cargando información del cliente...`;
      }
      return `${this.clienteExistenteData.name} - ${this.clienteExistenteData.phone} (Cliente existente)`;
    }
    return 'No hay cliente seleccionado';
  }

  garmentTypes = [
    { name: "Pantalón" },
    { name: "Chaqueta" },
    { name: "Chaleco" },
    { name: "Camisa" },
    { name: "Traje completo sin chaleco" },
    { name: "Traje completo con chaleco" }
  ];

  getGarmentTypeName(id: number): string {
    return this.garmentTypes[id]?.name || 'Desconocido';
  }
}