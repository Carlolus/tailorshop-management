import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Order } from '../../../../../core/models/order.model';

type OrderDetails = Omit<Order, 'order_id' | 'customer_id' | 'createdAt' | 'updatedAt'>;

@Component({
    selector: 'app-step2-order',
    standalone: true,
    templateUrl: './step2-order.component.html',
    styleUrls: ['./step2-order.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
    ]
})
export class Step2OrderComponent implements OnInit {
    @Output() orderDetailsValid = new EventEmitter<OrderDetails | null>();

    orderDetails: Partial<OrderDetails> = {
        order_date: new Date().toISOString().split('T')[0], // Fecha actual por defecto
        delivery_date: '',
        status: 'pendiente',
        price: 0,
        balance: 0
    };

    // Variables para el formateo de números
    priceFormatted: string = '0';
    balanceFormatted: string = '0';

    // Fecha mínima para el delivery (mañana)
    minDeliveryDate: Date;

    constructor() {
        this.minDeliveryDate = new Date();
        this.minDeliveryDate.setDate(this.minDeliveryDate.getDate() + 1);
    }

    ngOnInit() {
        this.validateAndEmit();
    }

    onDeliveryDateChange(event: any) {
        const selectedDate = event.value;
        if (selectedDate) {
            // Convertir a string en formato ISO
            this.orderDetails.delivery_date = selectedDate.toISOString().split('T')[0];
        } else {
            this.orderDetails.delivery_date = '';
        }
        this.validateAndEmit();
    }

    onPriceChange(event: any) {
        const value = event.target.value;
        // Remover caracteres no numéricos excepto puntos y comas
        const cleanValue = value.replace(/[^\d]/g, '');
        const numericValue = parseInt(cleanValue) || 0;
        
        this.orderDetails.price = numericValue;
        this.priceFormatted = this.formatNumber(numericValue);
        
        // Actualizar el valor del input
        event.target.value = this.priceFormatted;
        
        this.validateAndEmit();
    }

    onBalanceChange(event: any) {
        const value = event.target.value;
        // Remover caracteres no numéricos excepto puntos y comas
        const cleanValue = value.replace(/[^\d]/g, '');
        const numericValue = parseInt(cleanValue) || 0;
        
        this.orderDetails.balance = numericValue;
        this.balanceFormatted = this.formatNumber(numericValue);
        
        // Actualizar el valor del input
        event.target.value = this.balanceFormatted;
        
        this.validateAndEmit();
    }

    formatNumber(num: number): string {
        return num.toLocaleString('es-CO'); // Formato colombiano con puntos de miles
    }

    validateAndEmit() {
        const { delivery_date, price, balance } = this.orderDetails;
        
        // Validar que la fecha de entrega esté seleccionada y el precio sea mayor a 0
        if (delivery_date && price && price > 0) {
            const validOrderDetails: OrderDetails = {
                order_date: this.orderDetails.order_date!,
                delivery_date: delivery_date,
                status: 'pendiente',
                price: price,
                balance: balance || 0
            };
            this.orderDetailsValid.emit(validOrderDetails);
        } else {
            this.orderDetailsValid.emit(null);
        }
    }

    // Método para obtener los detalles de la orden (usado por el componente padre)
    getOrderDetails(): OrderDetails | null {
        const { delivery_date, price } = this.orderDetails;
        
        if (delivery_date && price && price > 0) {
            return {
                order_date: this.orderDetails.order_date!,
                delivery_date: delivery_date,
                status: 'pendiente',
                price: price,
                balance: this.orderDetails.balance || 0
            };
        }
        return null;
    }

    // Filtro para fechas - deshabilitar fechas anteriores a mañana
    dateFilter = (date: Date | null): boolean => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date > today;
    };
}