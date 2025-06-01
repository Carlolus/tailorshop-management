import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common'; // Importar formatDate
import { Router, ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { first } from 'rxjs/operators'; // Importar first

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

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsCo from '@angular/common/locales/es-CO';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeEsCo, 'es-CO');


@Component({
  standalone: true,
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ]
})
export class OrderListComponent implements OnInit {
  customerNameMap: Map<number, string> = new Map();
  orders: Order[] = [];
  customers: Customer[] = [];

  debtToShoW!: number;

  displayedColumns: string[] = ['id', 'client', 'status', 'createdDate', 'deliveryDate', 'price', 'debt', 'actions'];
  dataSource = new MatTableDataSource<Order>();
  isLoading = true;
  searchTerm: string = '';

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string // Inyectar locale para formatDate
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      await this.loadDataAndConfigureTable();
      this.route.queryParams.subscribe(params => {
        const customerName = params['customer_name'];
        if (customerName) {
          this.searchTerm = customerName;
          this.applyCurrentSearchTermFilter();
        } 
      });

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadDataAndConfigureTable(): Promise<void> {
    const customersData = await firstValueFrom(this.customerService.getCustomers());
    this.customers = customersData;
    this.customerNameMap = new Map(customersData.map(c => [c.customer_id, c.name]));

    this.orders = await firstValueFrom(this.orderService.getOrders());

    this.dataSource.data = this.orders;

    this.dataSource.filterPredicate = (order: Order, filter: string): boolean => {
      const searchTerm = filter;
      const customerName = this.getCustomerNameById(order.customer_id).toLowerCase();
      const statusLabel = this.getStatusLabel(order.status).toLowerCase();
      const orderDateFormatted = formatDate(order.order_date, 'mediumDate', this.locale).toLowerCase();
      const deliveryDateFormatted = formatDate(order.delivery_date, 'mediumDate', this.locale).toLowerCase();
      const orderDateShort = formatDate(order.order_date, 'dd/MM/yyyy', this.locale).toLowerCase();
      const deliveryDateShort = formatDate(order.delivery_date, 'dd/MM/yyyy', this.locale).toLowerCase();
      const dataToFilter = [
        order.order_id.toString(),
        customerName,
        statusLabel,
        orderDateFormatted,
        deliveryDateFormatted,
        orderDateShort,
        deliveryDateShort,
        this.debtToShoW,
        order.price.toString(),
        order.price.toLocaleString('es-CO')
      ].join(' ');

      return dataToFilter.includes(searchTerm);
    };
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pendiente': 'Pendiente',
      'en proceso': 'En proceso',
      'terminado': 'Terminado',
      'entregado': 'Entregado',
    };
    return statusMap[status.toLowerCase()] || status;
  }

  // Usar el customerNameMap para eficiencia
  getCustomerNameById(customer_id: number): string {
    return this.customerNameMap.get(customer_id) || 'Cliente Desconocido';
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace(/\s+/g, '_')}`;
  }

  onCreateOrder(): void {
    this.router.navigate(['admin/orders/new']);
  }

  onViewOrder(order_id: number): void {
    this.router.navigate(['admin/orders/', order_id]);
  }

  getPrice(order_id: number): number {
    const order = this.orders.find(o => o.order_id === order_id);
    return Math.round(order?.price || 1);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyCurrentSearchTermFilter(): void {
    if (this.dataSource) { 
      this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    }
  }

  getDebt(price: number, balance: number): number{
    return +(price - balance)
  }
}