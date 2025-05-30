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
    displayedColumns: string[] = ['id', 'customerName', 'orderId', 'price', 'actions'];
    searchText: string = '';

    ngOnInit(): void {
        // Initialization logic here if needed
    }


    payments = [
        { id: 1, customerName: 'Juan Pérez', orderId: 'ORD-1001', price: 150.75 },
        { id: 2, customerName: 'María García', orderId: 'ORD-1002', price: 89.99 },
        { id: 3, customerName: 'Carlos López', orderId: 'ORD-1003', price: 225.50 },
        { id: 4, customerName: 'Ana Martínez', orderId: 'ORD-1004', price: 45.25 },
        { id: 5, customerName: 'Luís Rodríguez', orderId: 'ORD-1005', price: 199.99 },
    ];

    get filteredPayments(): any[] {
        if (!this.searchText) return this.payments;

        const searchLower = this.searchText.toLowerCase();
        return this.payments.filter(payment =>
            payment.id.toString().includes(searchLower) ||
            payment.customerName.toLowerCase().includes(searchLower) ||
            payment.orderId.toLowerCase().includes(searchLower)
        );
    }

    viewPayment(payment: any): void {
        console.log('Ver pago:', payment);
        // Lógica para ver el pago
    }

    editPayment(payment: any): void {
        console.log('Editar pago:', payment);
        // Lógica para editar el pago
    }

    deletePayment(payment: any): void {
        console.log('Eliminar pago:', payment);
        // Lógica para eliminar el pago
    }


}