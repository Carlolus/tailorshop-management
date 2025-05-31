import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Asegúrate de RouterLink y Router
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa todo de forms

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// Models
import { Payment } from '../../../../core/models/payment.model';
import { Order } from '../../../../core/models/order.model';
import { Customer } from '../../../../core/models/customer.model';

// Services
import { PaymentService } from '../../../../core/services/payments/payment.service';
import { OrderService } from '../../../../core/services/orders/order.service';
import { CustomerService } from '../../../../core/services/customers/customers.service';
import { DialogService } from '../../../../core/services/dialog.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './payment-new.component.html',
  styleUrl: './payment-new.component.scss'
})
export class PaymentNewComponent implements OnInit {

  mode!: string;
  id!: string;
  order!: Order;
  payment!: Payment;
  paymentForm!: FormGroup;
  customer!: Customer;
  amountToShow: string = '0';

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      payment_method: ['', [Validators.required]],
      description: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.mode = this.route.snapshot.paramMap.get('mode') || 'nan';
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || isNaN(+idParam)) {
      console.log("No ID provided or invalid ID.");
      this.router.navigate(['/error']);
      return;
    }

    this.id = idParam;

    try {
      if (this.mode === 'new') {
        this.order = await firstValueFrom(this.orderService.getOrderById(+this.id));
      } else if (this.mode === 'edit') {
        this.payment = await firstValueFrom(this.paymentService.getPaymentById(+this.id));
        this.order = await firstValueFrom(this.orderService.getOrderById(this.payment.order_id));
        this.loadPaymentData();
      } else {
        console.log("Wrong mode detected. Redirecting.");
        this.router.navigate(['/error']);
        return;
      }

      if (this.order && this.order.customer_id) {
        this.customer = await firstValueFrom(this.customerService.getCustomerById(this.order.customer_id));
      }

    } catch (error) {
      console.error("Error loading data:", error);
      this.dialogService.openSnackBar('Error al cargar los datos.');
      this.router.navigate(['/error']);
    }
  }

  loadPaymentData() {
    this.paymentForm.patchValue({
      amount: 0,
      payment_method: this.payment.payment_method,
      description: this.payment.description
    });
    this.amountToShow = this.formatNumber(0);
  }

  onAmountChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
    const cleanValue = value.replace(/\D/g, '');
    let numericValue = parseInt(cleanValue, 10) || 0;

    if (this.mode === 'new' && numericValue > this.order.balance) {
      numericValue = 0;
    } else if (this.mode == 'edit' && numericValue > (+(this.order.balance) + +(this.payment.amount))){
      numericValue = 0;
    }

    // Actualizar formulario y vista
    this.paymentForm.get('amount')?.setValue(numericValue, { emitEvent: false });
    this.amountToShow = numericValue === 0 ? '0' : this.formatNumber(numericValue);
    inputElement.value = this.amountToShow;
  }

  getMaximunValue(){
    console.log(+(this.order.balance) + +(this.payment.amount))
    return +(this.order.balance) + +(this.payment.amount)
  }


  formatNumber(num: number): string {
    if (isNaN(num)) {
      return '0';
    }
    return num.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  async onSubmit(): Promise<void> {
    console.log("Entrando")
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      try {
        if (this.mode === 'new') {
          const paymentToCreate = {
            ...paymentData,
            order_id: this.order.order_id,
            payment_date: (new Date().toISOString().slice(0, 10))
          }
          console.log("Intentando crear: ", paymentToCreate)
          const newPayment = await firstValueFrom(this.paymentService.createPayment(paymentToCreate));
          this.dialogService.openSnackBar('Pago registrado exitosamente!');
          this.router.navigate(['admin/orders/', this.order.order_id]);
        } else if (this.mode === 'edit') {
          const paymentToUpdate = {
            ...paymentData,
            payment_id: this.payment.payment_id,
            order_id: this.order.order_id,
            payment_date: this.payment.payment_date
          }
          const updatedPayment = await firstValueFrom(this.paymentService.updatePayment(paymentToUpdate));
          this.dialogService.openSnackBar('Pago actualizado exitosamente!');
          this.router.navigate(['/admin/orders/', this.order.order_id]);
        }
      } catch (error) {
        this.dialogService.openSnackBar('Error al procesar el pago.');
        console.error(error);
      }
    } else {
      this.dialogService.openSnackBar('Por favor, complete todos los campos requeridos correctamente.');
      this.paymentForm.markAllAsTouched();
    }
  }

}