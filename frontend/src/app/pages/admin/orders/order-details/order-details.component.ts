import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../core/services/orders/order.service';
import { Order } from '../../../../core/models/order.model';
import { CustomerService } from '../../../../core/services/customers/customers.service';
import { Customer } from '../../../../core/models/customer.model';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = ['order_id', 'customer', 'delivery_date', 'price', 'status', 'actions'];
  customers: Record<number, Customer> = {};

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loadCustomersForOrders(orders);
      },
      error: (err) => console.error('Error loading orders:', err)
    });
  }

  loadCustomersForOrders(orders: Order[]) {
    const uniqueCustomerIds = [...new Set(orders.map(o => o.customer_id))];
    uniqueCustomerIds.forEach(id => {
      this.customerService.getCustomerById(id).subscribe({
        next: (customer) => {
          this.customers[id] = customer;
        },
        error: () => {
          this.customers[id] = { name: 'Desconocido', phone: '', address: '', mail: '', customer_id: id };
        }
      });
    });
  }

  getCustomerName(id: number): string {
    return this.customers[id]?.name || 'Cargando...';
  }
}
