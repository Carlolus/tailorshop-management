import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Customer } from '../../../../../core/models/customer.model';
import { OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CustomerService } from '../../../../../core/services/customers/customers.service';
import { MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-customer-dialog',
    templateUrl: './edit-customer-dialog.component.html',
    styleUrls: ['./edit-customer-dialog.component.scss'],
    imports: [
        MatDialogContent,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatButtonModule,
        CommonModule,
        FormsModule
    ]
})
export class EditCustomerDialogComponent implements OnInit {
    customerInput: string = '';
    filteredCustomers: Customer[] = [];
    selectedCustomer: Customer | null = null;
    customers: Customer[] = [];

    constructor(
        public dialogRef: MatDialogRef<EditCustomerDialogComponent>,
        private customerService: CustomerService
    ) { }

    async ngOnInit(): Promise<void> {
        this.customers = await firstValueFrom(this.customerService.getCustomers());
        this.onCustomerInputChange();
    }
    onCustomerInputChange(): void {
        const value = this.customerInput.toLowerCase().trim();

        if (value === '') {
            this.filteredCustomers = [...this.customers];
        } else {
            this.filteredCustomers = this.customers.filter(
                c =>
                    c.name.toLowerCase().includes(value) ||
                    c.phone.includes(value)
            );
        }
    }

    displayCustomer(customer: Customer): string {
        return customer ? customer.name : '';
    }

    selectCustomer(customer: Customer): void {
        this.selectedCustomer = customer;
    }

    confirm(): void {
        if (this.selectedCustomer) {
            this.dialogRef.close(this.selectedCustomer);
        }
    }
}
