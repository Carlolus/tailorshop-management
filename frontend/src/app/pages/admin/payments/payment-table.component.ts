import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PaymentService } from '../../../core/services/payments/payment.service';

interface LocalPayment {
  payment_id: number;
  amount: number;
  order_id: number;
  payment_date: string;
  paymentOrder?: {
    order_id: number;
    customer_id: number;
    orderCustomer?: {
      customer_id: number;
      name: string;
    };
  };
}

interface PaymentTableItem {
  id: number;
  customerName: string;
  orderId: number;
  price: number;
  raw: LocalPayment;
}

@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'orderId',  'customerName', 'date', 'price', 'actions'];
  searchText: string = '';
  payments2: PaymentTableItem[] = [];

  constructor(private paymentService: PaymentService) {}

  async ngOnInit(): Promise<void> {
    const rawPayments = await firstValueFrom(this.paymentService.getPayments());
    this.payments2 = rawPayments.map((p: LocalPayment) => ({
      id: p.payment_id,
      customerName: p.paymentOrder?.orderCustomer?.name || 'N/A',
      orderId: p.order_id,
      payment_date: p.payment_date,
      price: p.amount,
      raw: p
    }));
  }

  get filteredPayments(): PaymentTableItem[] {
    if (!this.searchText) return this.payments2;

    const searchLower = this.searchText.toLowerCase();
    return this.payments2.filter(payment =>
      payment.id.toString().includes(searchLower) ||
      payment.customerName.toLowerCase().includes(searchLower) ||
      payment.orderId.toString().includes(searchLower)
    );
  }

  viewPayment(payment: PaymentTableItem): void {
    console.log('Ver pago:', payment);
    // Lógica para ver el pago
  }

  editPayment(payment: PaymentTableItem): void {
    console.log('Editar pago:', payment);
    // Lógica para editar el pago
  }

  deletePayment(payment: PaymentTableItem): void {
    console.log('Eliminar pago:', payment);
    // Lógica para eliminar el pago
  }
}
