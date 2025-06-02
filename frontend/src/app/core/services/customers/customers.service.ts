import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { HttpHeaderService } from '../httpHeader';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/customers';

  constructor(
    private http: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl, { headers: this.httpHeaderService.getHeaders() });
  }

  getCustomersCount(year?: number, month?: number): Observable<{ totalCustomers: number }> {
    const params: any = {};
    if (month !== undefined && year !== undefined) {
      params.month = month;
      params.year = year;
    }
    return this.http.get<{ totalCustomers: number }>(
      this.apiUrl + '/count',
      {
        headers: this.httpHeaderService.getHeaders(),
        params
      }
    );
  }

  createCustomer(customer: Omit<Customer, 'customer_id'>): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer, { headers: this.httpHeaderService.getHeaders() });
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.apiUrl}/${customer.customer_id}`,
      customer,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }


  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}
