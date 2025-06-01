import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakService } from '../../core/services/auth/keycloak.service';
import { CommonModule } from '@angular/common';

// Models
import { Order } from '../../core/models/order.model';
import { Garment } from '../../core/models/garment.model';
import { GarmentType } from '../../core/models/garment-type.model';
import { Customer } from '../../core/models/customer.model';
import { Payment } from '../../core/models/payment.model';

// Services
import { OrderService } from '../../core/services/orders/order.service';
import { GarmentService } from '../../core/services/garment/garment.service';
import { GarmentTypeService } from '../../core/services/garment-types/garment-types.service';
import { CustomerService } from '../../core/services/customers/customers.service';
import { PaymentService } from '../../core/services/payments/payment.service';
import { firstValueFrom } from 'rxjs';

interface StatData {
  value: string | number;
  label: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
}

interface ActivityItem {
  title: string;
  time: string;
  icon: string;
  type: 'success' | 'info' | 'warning' | 'primary';
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  currentMonth!: number;
  currentYear!: number;

  pastMonth!: number;
  pastYear!: number;

  earningsThisMonthValue!: string;
  earningsPercentage!: string;

  customersCount!: number;
  customersThisMonth!: number;
  customersPercentaje!: string;

  ordersTotal!: number;
  ordersThisMonth!: number;
  ordersPercentaje!: string;

  ordersPendant!: number;
  ordersProcess!: number;
  ordersFinished!: number;
  ordersDeliveredes!: number;

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {

  }

  stats: StatData[] = [];

  // Actividades recientes
  recentActivities: ActivityItem[] = [
    {
      title: 'Orden #1234 completada',
      time: 'Hace 2 horas',
      icon: '✅',
      type: 'success'
    },
    {
      title: 'Pago recibido - Cliente: María González',
      time: 'Hace 4 horas',
      icon: '💰',
      type: 'info'
    },
    {
      title: 'Nueva orden creada - Traje ejecutivo',
      time: 'Hace 1 día',
      icon: '📦',
      type: 'warning'
    },
    {
      title: 'Inventario actualizado - Tela italiana',
      time: 'Hace 2 días',
      icon: '🧵',
      type: 'primary'
    }
  ];

  async ngOnInit(): Promise<void> {
    // Aquí puedes cargar datos desde tu API
    await this.calculatePaymentsPerMonth();
    await this.calculateOrdersPerMonth();
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    // Esperar un momento para que los elementos se rendericen
    setTimeout(() => {
    }, 100);
  }

  private loadDashboardData(): void {
    this.stats = [
      {
        value: this.earningsThisMonthValue,
        label: 'Ingresos del Mes',
        change: this.earningsPercentage,
        changeType: 'positive',
        icon: '💰'
      },
      {
        value: this.ordersTotal,
        label: 'Total ordenes registradas',
        change: '',
        changeType: 'positive',
        icon: '👔'
      },
      {
        value: this.ordersThisMonth,
        label: 'Ordenes del Mes',
        change: this.ordersPercentaje,
        changeType: 'positive',
        icon: '👔'
      },
      {
        value: 'Trajes',
        label: 'Más Vendido del Mes',
        change: '+15.3%',
        changeType: 'positive',
        icon: '👔'
      },
      {
        value: 127,
        label: 'Órdenes Pendientes',
        change: '+8.2%',
        changeType: 'positive',
        icon: '📦'
      },
      {
        value: 'Ordenes En Proceso',
        label: 'Más Vendido del Mes',
        change: '+15.3%',
        changeType: 'positive',
        icon: '👔'
      },
      {
        value: 'Ordenes finalizadas',
        label: 'Más Vendido del Mes',
        change: '+15.3%',
        changeType: 'positive',
        icon: '👔'
      },
    ];
  }

  async calculatePaymentsPerMonth(): Promise<void> {
    const now = new Date();

    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    this.currentMonth = currentMonth;
    this.currentYear = currentYear;

    const pastDate = new Date(now);
    pastDate.setMonth(now.getMonth() - 1);

    const pastMonth = pastDate.getMonth() + 1;
    const pastYear = pastDate.getFullYear();

    this.pastMonth = pastMonth;
    this.pastYear = pastYear;

    const paymentsThisMonth = await firstValueFrom(
      this.paymentService.getPaymentsByMonth(currentMonth, currentYear)
    );

    const paymentsPastMonth = await firstValueFrom(
      this.paymentService.getPaymentsByMonth(pastMonth, pastYear)
    );

    const earningsThisMonth = paymentsThisMonth.reduce((sum, p) => sum + +(p.amount), 0);
    const earningsPastMonth = paymentsPastMonth.reduce((sum, p) => sum + +(p.amount), 0);

    let percentage = "0%";
    if (earningsPastMonth > 0) {
      const diff = ((earningsThisMonth - earningsPastMonth) / earningsPastMonth) * 100;
      percentage = `+${diff.toFixed(1)}%`;
    } else if (earningsThisMonth > 0) {
      percentage = "+100%";
    }

    const earningsValue = Number(earningsThisMonth) || 0;
    this.earningsThisMonthValue = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(earningsValue);
    this.earningsPercentage = percentage;
  }

  async calculateOrdersPerMonth(): Promise<void> {

    const ordersTotalResponse = await firstValueFrom(this.orderService.getOrdersCount());
    const ordersTotal = ordersTotalResponse.totalOrders;

    const ordersThisMonthResponse = await firstValueFrom(this.orderService.getOrdersCount(this.currentYear, this.currentMonth));
    const ordersThisMonth = ordersThisMonthResponse.totalOrders;

    const ordersPastMonthResponse = await firstValueFrom(this.orderService.getOrdersCount(this.pastYear, this.pastMonth));
    const ordersPastMonth = ordersPastMonthResponse.totalOrders;

    this.ordersThisMonth = ordersThisMonth;
    this.ordersTotal = ordersTotal;

    let percentage = "0%";

    if (ordersPastMonth > 0) {
      const diff = ((ordersThisMonth - ordersPastMonth) / ordersPastMonth) * 100;
      percentage = `+${diff.toFixed(1)}%`;
    } else if (ordersThisMonth > 0) {
      percentage = "+100%";
    }
    this.ordersPercentaje = percentage;
  }

  async calculateOrders(): Promise<void> {

  }

  onViewRecentOrders(): void {
    console.log('Ver órdenes recientes');
  }

  onViewReports(): void {
    console.log('Ver reportes');
  }

  onOpenSettings(): void {
    console.log('Abrir configuración');
  }
}