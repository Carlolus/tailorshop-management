import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Order } from '../../../../../core/models/order.model';
import { firstValueFrom } from 'rxjs';
import { OrderService } from '../../../../../core/services/orders/order.service';
import { MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-edit-order-dialog',
    templateUrl: './edit-order-dialog.component.html',
    styleUrls: ['./edit-order-dialog.component.scss'],
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogTitle,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        MatDatepickerModule
    ]
})
export class EditOrderDialogComponent implements OnInit {
    orderForm!: FormGroup;
    order!: Order;
    isLoading = true;
    minDate = new Date();
    priceToShow!: string;

    statusOptions = [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'en proceso', label: 'En Proceso' },
        { value: 'terminado', label: 'Terminado' },
        { value: 'entregado', label: 'Entregado' }
    ];

    constructor(
        public dialogRef: MatDialogRef<EditOrderDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { order_id: number },
        private orderService: OrderService,
        private fb: FormBuilder
    ) {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.orderForm = this.fb.group({
            status: ['', Validators.required],
            delivery_date: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]] // Validador min(0) se mantiene
        });
    }

    async ngOnInit(): Promise<void> {
        console.log(this.data.order_id);
        try {
            this.order = await firstValueFrom(this.orderService.getOrderById(this.data.order_id));
            this.populateForm();
            this.setupCustomValidators(); // Renombrado para claridad y llamado después de tener 'this.order'
        } catch (error) {
            console.error('Error loading order:', error);
        } finally {
            this.isLoading = false;
        }
    }

    private populateForm(): void {
        const priceValue = Math.round(this.order.price);
        this.orderForm.patchValue({
            status: this.order.status,
            delivery_date: this.order.delivery_date ? new Date(this.order.delivery_date) : null,
            price: priceValue
        });
        this.priceToShow = this.formatNumber(priceValue);
    }

    private setupCustomValidators(): void {
        const priceControl = this.orderForm.get('price');
        if (priceControl) {
            const priceExceedsBalanceValidator = (control: AbstractControl): { [key: string]: any } | null => {
                const price = control.value;
                if (this.order?.balance !== undefined && typeof price === 'number') {
                    if (price < (this.order.price - this.order.balance)) {
                        // Si ya está pagado, su precio no puede ser menor
                        return {
                            priceExceedsBalance: {
                                actualPrice: price,
                                maxAllowed: this.order.balance
                            }
                        };
                    } 
                }
                return null; // Sin error
            };

            // Añadir el validador personalizado a los validadores existentes
            priceControl.setValidators([
                Validators.required,
                Validators.min(0),
                priceExceedsBalanceValidator // Tu nuevo validador
            ]);
            priceControl.updateValueAndValidity(); // Aplicar los cambios de validadores
        }
    }

    get statusControl() {
        return this.orderForm.get('status');
    }

    get deliveryDateControl() {
        return this.orderForm.get('delivery_date');
    }

    get priceControl() {
        return this.orderForm.get('price');
    }

    getPriceErrorMessage(): string {
        if (this.priceControl?.hasError('required')) {
            return 'El precio es requerido';
        }
        if (this.priceControl?.hasError('min')) {
            return 'El precio debe ser mayor o igual a 0';
        }
        // Nuevo mensaje de error para cuando el precio excede el balance
        if (this.priceControl?.hasError('priceExceedsBalance')) {
            const error = this.priceControl.errors?.['priceExceedsBalance'];
            return `El precio no puede ser mayor que el balance actual ($${this.formatNumber(error.maxAllowed)})`;
        }
        return '';
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onConfirm(): void {
        if (this.orderForm.valid) {
            const deliveryDateValue: Date | null = this.orderForm.value.delivery_date;
            let deliveryDateString: string | null = null;
            if (deliveryDateValue instanceof Date) {
                deliveryDateString = deliveryDateValue.toISOString().split('T')[0];
            }
            const updatedOrder = {
                order_id: this.order.order_id,
                customer_id: this.order.customer_id,
                order_date: this.order.order_date,
                balance: +(this.orderForm.value.price - (this.order.price - this.order.balance)),
                status: this.orderForm.value.status,
                delivery_date: deliveryDateString,
                price: this.orderForm.value.price
            };
            this.dialogRef.close(updatedOrder);
        } else {
            this.orderForm.markAllAsTouched();
        }
    }

    onPriceChange(event: any): void {
        const value = event.target.value;
        const cleanValue = value.replace(/[^\d]/g, '');
        const numericValue = cleanValue === '' ? 0 : parseInt(cleanValue, 10);

        this.orderForm.get('price')?.setValue(numericValue, { emitEvent: false });
        this.priceToShow = this.formatNumber(numericValue);
        event.target.value = this.priceToShow;
    }

    formatNumber(num: number): string {
        if (isNaN(num)) {
            return '0';
        }
        return num.toLocaleString('es-CO'); // Formato para Colombia (e.g., 1.000.000)
    }
}