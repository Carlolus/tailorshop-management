import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Customer } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customers/customers.service';
import { DialogService } from '../../../core/services/dialog.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    FormsModule,
    CustomerFormComponent
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {

  isViewMode: boolean = false;
  customers: Customer[] = [];
  isLoading = true;
  private destroy$ = new Subject<void>();
  showForm = false;
  selectedCustomer: Customer | null = null;
  searchTerm: string = '';

  constructor(
    private customerService: CustomerService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.customerService.getCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (customers) => {
          this.customers = customers;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading customers:', err);
          this.isLoading = false;
        }
      });
  }

  get filteredCustomers() {
    if (!this.searchTerm.trim()) return this.customers;
    const term = this.searchTerm.toLowerCase();
    return this.customers.filter(f =>
      f.name.toLowerCase().includes(term) ||
      f.phone.toLowerCase().includes(term) ||
      f.address?.toLowerCase().includes(term)
    );
  }


  confirmDelete(customerId: number): void {
    this.dialogService.confirm(
      'Eliminar cliente',
      '¿Estás seguro de que deseas eliminar esta cliente?'
    ).then(confirmed => {
      if (confirmed) this.deleteCustomer(customerId);
    });
  }

  private deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadCustomers();
          this.dialogService.notify('Cliente eliminado correctamente', '', "success");
        },
        error: (err) => {
          console.error('Error deleting customer:', err);
          this.dialogService.notify('Error al eliminar el cliente', 'error');
        }
      });
  }

  openCreateForm(): void {
    this.selectedCustomer = null;
    this.isViewMode = false;
    this.showForm = true;
  }

  openEditForm(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isViewMode = false;
    this.showForm = true;
  }

  openViewForm(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isViewMode = true;
    this.showForm = true;
  }

  onFormClosed(): void {
    this.showForm = false;
    this.isViewMode = false;
  }

  saveCustomer(customer: Customer): void {
    const operation = customer.customer_id
      ? this.customerService.updateCustomer(customer)
      : this.customerService.createCustomer(customer);

    operation.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadCustomers();
          this.showForm = false;
          this.dialogService.notify(
            (`Cliente ${customer.customer_id ? 'actualizado' : 'creado'} correctamente`),
            "success"
          );
        },
        error: (err) => {
          console.error('Error saving customer:', err);
          this.dialogService.notify('Error al guardar el cliente', 'error');
        }
      });
  }

}
