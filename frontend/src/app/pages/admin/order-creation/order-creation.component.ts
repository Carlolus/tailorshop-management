import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Steps component
import { Step1CustomerComponent } from './steps/step1-customer/step1-customer.component';
import { Step2OrderComponent } from './steps/step2-order/step2-order.component';
import { Step3GarmentsComponent } from './steps/step3-garments/step3-garments.component';

// Models
import { Customer } from '../../../core/models/customer.model';
import { Order } from '../../../core/models/order.model';
import { Garment } from '../../../core/models/garment.model'; // Ensure this model includes 'measures: string;'

// Services
import { CustomerService } from '../../../core/services/customers/customers.service';
import { GarmentService } from '../../../core/services/garment/garment.service';
import { GarmentTypeService } from '../../../core/services/garment-types/garment-types.service';
import { OrderService } from '../../../core/services/orders/order.service';

// Angular Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { GarmentType } from '../../../core/models/garment-type.model'; // Assuming you still need this for getGarmentTypeName

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
  prendasForm: FormGroup; // This form group exists but its internal structure is managed by step3-garments
  clienteExistenteData?: Customer;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private orderService: OrderService,
    private garmentTypeService: GarmentTypeService, // Injected but not used directly in this snippet
    private garmentService: GarmentService,
    private router: Router // Injected but not used directly in this snippet
  ) {
    // Form for the customer step - validation is handled manually by emitting from Step1CustomerComponent
    this.clienteForm = this.fb.group({
      clienteValido: [false, Validators.requiredTrue]
    });

    // Form for the order details step - validation is handled manually by emitting from Step2OrderComponent
    this.ordenForm = this.fb.group({
      ordenValida: [false, Validators.requiredTrue],
      fechaEntrega: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      abono: [0]
    });

    // Form for the garments step - validation is handled manually by emitting from Step3GarmentsComponent
    // The specific controls for garments are within Step3GarmentsComponent itself.
    this.prendasForm = this.fb.group({
      prendasValidas: [false, Validators.requiredTrue] // A simple control to mark the step as valid/invalid
    });
  }

  // Variables to manage customer state
  clienteExistenteId: number | null = null;
  clienteNuevo: Customer | null = null;
  pasoClienteValido = false;

  // Variables to manage order state
  orderDetails: OrderDetails | null = null;
  pasoOrdenValido = false;

  // Variables to store garment data (updated type)
  garmentsData: Garment[] | null = null;
  pasoPrendasValido = false;

  /**
   * Processes data emitted from Step1CustomerComponent.
   * @param event The customer data (new or existing ID) or null if invalid.
   */
  procesarCliente(event: { tipo: 'nuevo'; data: Customer } | { tipo: 'existente'; id: number } | null) {
    if (!event) {
      this.clienteExistenteId = null;
      this.clienteNuevo = null;
      this.pasoClienteValido = false;
      this.clienteForm.patchValue({ clienteValido: false });
      return;
    }

    if (event.tipo === 'nuevo') {
      // Convert CustomerForOrder to Customer format for internal use
      this.clienteNuevo = {
        ...event.data,
        customer_id: 0 // Temporary ID, will be set when created
      } as Customer;
      this.clienteExistenteId = null;
      this.pasoClienteValido = true;
      console.log('Nuevo cliente preparado:', this.clienteNuevo);
    } else { // tipo === 'existente'
      this.clienteExistenteId = event.id;
      this.clienteNuevo = null;
      this.pasoClienteValido = true;
      console.log('Cliente existente seleccionado ID:', this.clienteExistenteId);
    }

    this.clienteForm.patchValue({ clienteValido: true });
  }


  /**
   * Processes order details data emitted from Step2OrderComponent.
   * @param orderDetails The order details or null if invalid.
   */
  procesarOrden(orderDetails: OrderDetails | null) {
    this.orderDetails = orderDetails;
    this.pasoOrdenValido = !!orderDetails; // Set to true if orderDetails is not null

    // Update the local form group for the stepper control
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

  /**
   * Processes garment data emitted from Step3GarmentsComponent.
   * @param garments The array of Garment objects or null if invalid.
   *
   * This is the method that was causing the error and has been corrected.
   */
  procesarPrendas(garments: any[] | null) {
    if (garments && garments.length > 0) {
      this.garmentsData = garments.map(garment => ({
        ...garment,
        garment_id: garment.garment_id || 0,
        order_id: garment.order_id || 0
      })) as Garment[];

      this.pasoPrendasValido = true;
      this.prendasForm.patchValue({ prendasValidas: true });
      console.log('Datos de prendas válidos:', this.garmentsData);
    } else {
      this.garmentsData = null;
      this.pasoPrendasValido = false;
      this.prendasForm.patchValue({ prendasValidas: false });
    }
  }

  /**
   * Confirms and processes the complete order.
   */
  async confirmarOrden() {
    console.log('=== CONFIRMANDO ORDEN ===');

    // Basic validation before proceeding
    if (!this.pasoClienteValido || !this.pasoOrdenValido || !this.pasoPrendasValido) {
      console.warn('Faltan datos válidos en uno or más pasos para confirmar la orden.');
      // Optionally, show a user-friendly message
      return;
    }

    try {
      let customerId: number;

      // Handle customer creation or use existing customer
      if (this.clienteNuevo) {
        console.log('Creando nuevo cliente:', this.clienteNuevo);
        const camposSeleccionados = {
          name: this.clienteNuevo?.name,
          phone: this.clienteNuevo?.phone,
          email: this.clienteNuevo?.mail,
          address: this.clienteNuevo?.address
          // agrega los campos que necesites
        };

        // Create new customer and get the returned ID
        const newCustomer = await this.customerService.createCustomer(camposSeleccionados).toPromise();

        if (!newCustomer || !newCustomer.customer_id) {
          throw new Error('Error al crear el cliente: respuesta inválida del servidor');
        }

        customerId = newCustomer.customer_id;
        console.log('Nuevo cliente creado con ID:', customerId);

      } else if (this.clienteExistenteId) {
        console.log('Usando cliente existente ID:', this.clienteExistenteId);

        // Use existing customer ID
        customerId = this.clienteExistenteId;
      } else {
        throw new Error('No se encontró información válida del cliente');
      }

      // Assign customer_id to order details
      if (this.orderDetails) {
        this.orderDetails.customer_id = customerId;

        console.log('Creando orden con detalles:', this.orderDetails);

        const camposSeleccionados = {
          customer_id: this.orderDetails?.customer_id,
          order_date: this.orderDetails?.order_date,
          delivery_date: this.orderDetails?.delivery_date,
          price: this.orderDetails?.price,
          balance: this.orderDetails?.balance,
          status: this.orderDetails?.status
        };

        // Create the order and get the returned ID
        const newOrder = await this.orderService.createOrder(camposSeleccionados).toPromise();

        if (!newOrder || !newOrder.order_id) {
          throw new Error('Error al crear la orden: respuesta inválida del servidor');
        }

        const orderId = newOrder.order_id;
        console.log('Nueva orden creada con ID:', orderId);

        // Assign order_id to each garment and create them
        if (this.garmentsData && this.garmentsData.length > 0) {
          console.log('Creando prendas para la orden...');
          console.log("Datos a cargar: ", this.garmentsData);

          // Create all garments with selected fields (excluding garment_id)
          const garmentPromises = this.garmentsData.map(garment => {
            const camposSeleccionadosGarment = {
              order_id: orderId, // Asignamos el order_id aquí
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

          console.log('Prendas creadas exitosamente:', createdGarments);
          console.log('=== ORDEN CONFIRMADA EXITOSAMENTE ===');


          //this.router.navigate(['/orders']);

        } else {
          throw new Error('No se encontraron datos válidos de prendas');
        }
      } else {
        throw new Error('No se encontraron detalles válidos de la orden');
      }

    } catch (error) {
      console.error('Error al confirmar la orden:', error);
      // Handle error appropriately (show user message, etc.)
    }
  }


  /**
   * Provides client information for the summary section.
   */
  getClienteInfo(): string {
    if (this.clienteNuevo) {
      return `${this.clienteNuevo.name} - ${this.clienteNuevo.phone} (Nuevo cliente)`;
    } else if (this.clienteExistenteId) {
      // If customer data isn't loaded yet, fetch it. This assumes getCustomerById
      // updates clienteExistenteData which will then trigger template refresh.
      if (!this.clienteExistenteData || this.clienteExistenteData.customer_id !== this.clienteExistenteId) {
        this.customerService.getCustomerById(this.clienteExistenteId).subscribe({
          next: (customer) => {
            this.clienteExistenteData = customer;
          },
          error: (err) => {
            console.error('Error loading existing customer data:', err);
            this.clienteExistenteData = undefined; // Clear data on error
          }
        });
        return `Cargando información del cliente...`;
      }
      return `${this.clienteExistenteData.name} - ${this.clienteExistenteData.phone} (Cliente existente)`;
    }
    return 'No hay cliente seleccionado';
  }

  // Hardcoded garment types for display purposes in the summary
  garmentTypes = [
    { id: 1, name: "Pantalón" }, // Added id for consistency
    { id: 2, name: "Chaqueta" },
    { id: 3, name: "Chaleco" },
    { id: 4, name: "Camisa" },
    { id: 5, name: "Traje completo sin chaleco" },
    { id: 6, name: "Traje completo con chaleco" }
  ];

  /**
   * Helper to get garment type name by its ID.
   * @param id The garment type ID.
   */
  getGarmentTypeName(id: number): string {
    // Find by id directly, assuming id correlates to an actual ID in your data, not just index + 1
    const garmentType = this.garmentTypes.find(type => type.id === id);
    return garmentType?.name || 'Desconocido';
  }
}