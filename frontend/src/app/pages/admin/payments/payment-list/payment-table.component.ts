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
import { PaymentService } from '../../../../core/services/payments/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../core/services/dialog.service';

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
  displayedColumns: string[] = ['id', 'orderId', 'customerName', 'date', 'price', 'actions'];
  searchText: string = '';
  payments2: PaymentTableItem[] = [];

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) { }

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

    this.route.queryParams.subscribe(params => {
      const customerName = params['customerName'];
      const orderIdParam = params['order_id'];

      if (customerName) {
        this.searchText = customerName;
      } else if (orderIdParam) {
        this.searchText = orderIdParam.toString();
      }
    });
  }

  get filteredPayments(): PaymentTableItem[] {
    if (!this.searchText) return this.payments2;

    const searchLower = this.searchText.toLowerCase();
    return this.payments2.filter(payment =>
      payment.customerName.toLowerCase().includes(searchLower) ||
      payment.orderId.toString().includes(searchLower)
    );
  }

  viewPayment(payment: PaymentTableItem): void {
  }

  editPayment(payment: PaymentTableItem): void {
    this.router.navigate(['admin/finance/payments/edit', payment.id]);
  }

  confirmdeletePayment(payment: PaymentTableItem): void {
    this.dialogService.confirm("Eliminar pago",
      "¿Está seguro de que desea eliminar el pago?"
    ).then(confirmed => {
      if (confirmed) this.deletePayment(payment.id);
    });
  }


  deletePayment(payment_id: number): void {
    this.paymentService.deletePayment(payment_id).subscribe({
      next: () => {
        this.dialogService.notify(
          'Eliminación Exitosa',
          `El pago con ID ${payment_id} ha sido eliminado correctamente.`,
          'success'
        );
        this.payments2 = this.payments2.filter(p => p.id !== payment_id);
      },
      error: (err) => {
        this.dialogService.notify(
          'Error al Eliminar',
          `No se pudo eliminar el pago con ID ${payment_id}.`,
          'error'
        );
      }
    });
  }
}
