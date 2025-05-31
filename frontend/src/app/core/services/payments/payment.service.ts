import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../../models/payment.model';
import { HttpHeaderService } from '../httpHeader';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/payments';

  constructor(
    private http: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl, { headers: this.httpHeaderService.getHeaders() });
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  createPayment(payment: Omit<Payment, 'payment_id'>): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment, { headers: this.httpHeaderService.getHeaders() });
  }

  updatePayment(payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(
      `${this.apiUrl}/${payment.payment_id}`,
      payment,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  getPaymentsByOrderId(order_id: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(
      `${this.apiUrl}?order_id=${order_id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}
