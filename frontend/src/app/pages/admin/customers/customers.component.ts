import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Customer } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customers/customers.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];
  isLoading = true;
  private destroy$ = new Subject<void>();
  showForm = false;
  selectedCustomer: Customer | null = null;
  searchTerm: string = '';

  constructor(
    private customerService: CustomerService
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
        next: (Customers) => {
          this.customers = Customers;
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

  onFormClosed(): void {
    this.showForm = false;
  }

}
