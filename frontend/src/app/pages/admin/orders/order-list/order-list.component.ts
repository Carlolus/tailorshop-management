import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Order } from '../../../../core/models/order.model';


@Component({
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
  displayedColumns: string[] = ['id', 'client', 'status', 'createdDate', 'deliveryDate', 'price', 'actions'];
  dataSource = new MatTableDataSource();
  isLoading = true;

  // Datos de ejemplo - reemplaza con tu servicio real
  sampleOrders = [
    {
      id: 1001,
      client: { name: 'Juan Pérez', email: 'juan@example.com', phone: '3001234567' },
      status: 'en_progreso',
      created_date: new Date('2023-05-15'),
      delivery_date: new Date('2023-06-10'),
      price: 250000,
      balance: 150000
    },
    {
      id: 1002,
      client: { name: 'María Gómez', email: 'maria@example.com', phone: '3102345678' },
      status: 'pendiente',
      created_date: new Date('2023-05-18'),
      delivery_date: new Date('2023-06-15'),
      price: 180000,
      balance: 0
    },
    {
      id: 1003,
      client: { name: 'Carlos Rodríguez', email: 'carlos@example.com', phone: '3203456789' },
      status: 'entregado',
      created_date: new Date('2023-04-20'),
      delivery_date: new Date('2023-05-25'),
      price: 320000,
      balance: 320000
    }
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Simular carga de datos
    setTimeout(() => {
      this.dataSource.data = this.sampleOrders;
      this.isLoading = false;
    }, 1000);
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

  getStatusClass(status: string): string {
    return `status-${status.replace(' ', '_')}`;
  }

  onViewOrder(orderId: number): void {
    console.log('Ver orden:', orderId);
    // Aquí puedes implementar la navegación o diálogo para ver la orden
  }

  onEditOrder(orderId: number): void {
    console.log('Editar orden:', orderId);
    // Implementar lógica de edición
  }

  onDeleteOrder(orderId: number): void {
    console.log('Eliminar orden:', orderId);
    // Implementar lógica de eliminación con confirmación
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}