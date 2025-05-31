import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../../../../core/models/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {
  @Input() customerData: Customer | null = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<Customer>();
  @Input() isViewMode: boolean = false;


  customerForm: FormGroup;

  constructor(
    private cb: FormBuilder,
    private router: Router
  ) {
    this.customerForm = this.cb.group({
      customer_id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.maxLength(13)]],
      address: [''],
      mail: ['']
    });
  }

  ngOnChanges(): void {
    if (this.customerData) {
      this.customerForm.patchValue(this.customerData);
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.formSubmitted.emit(this.customerForm.value);
    }
  }

  closeForm(): void {
    this.formClosed.emit();
  }

  goToCustomerPayments() {
    this.router.navigate(['/admin/payments'], {
      queryParams: { customer_name: this.customerData?.name }
    });
  }
}