import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Models
import { Order } from '../../../../core/models/order.model';
import { Customer } from '../../../../core/models/customer.model';

// Services
import { OrderService } from '../../../../core/services/orders/order.service';
import { CustomerService } from '../../../../core/services/customers/customers.service';
import { firstValueFrom } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule, // Este es el módulo para mat-spinner
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  customers: Customer[] = [];

  displayedColumns: string[] = ['id', 'client', 'status', 'createdDate', 'deliveryDate', 'price', 'actions'];
  dataSource = new MatTableDataSource();
  isLoading = true;

  // Datos de ejemplo - reemplaza con tu servicio real

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = true;
      await this.loadData();
      this.dataSource.data = this.orders; // Mover esto después de loadData
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pendiente': 'Pendiente',
      'en_progreso': 'En progreso',
      'terminado': 'Terminado',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };
    return statusMap[status] || status;
  }

  getCustomerNameById(id: number): string {
    const customer = this.customers.find(c => c.customer_id === id);
    return customer ? `${customer.name}` : 'Cliente no encontrado';
  }

  async loadData() {
    this.customers = await firstValueFrom(this.customerService.getCustomers());
    this.orders = await firstValueFrom(this.orderService.getOrders());
    this.dataSource.data = this.orders;
  }

  getStatusClass(status: string): string {
    return `status-${status.replace(' ', '_')}`;
  }

  onViewOrder(order_id: number): void {
    this.router.navigate(['admin/orders/',order_id]);
  }

  getPrice(order_id: number): number {
    const order = this.orders.find(o => o.order_id === order_id);
    return Math.round(order?.price || 1);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}