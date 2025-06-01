import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { HttpHeaderService } from '../httpHeader';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(
    private http: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { headers: this.httpHeaderService.getHeaders() });
  }

  getOrdersByMonth(month?: number, year?: number): Observable<Order[]> {
    const params: any = {};

    if (month !== undefined && year !== undefined) {
      params.month = month;
      params.year = year;
    }
    return this.http.get<Order[]>(this.apiUrl, {
      headers: this.httpHeaderService.getHeaders(),
      params
    });
  }

  getOrdersCount(year?: number, month?: number): Observable<{ totalOrders: number }> {
    const params: any = {};

    if (month !== undefined && year !== undefined) {
      params.year = year;
      params.month = month;
    }

    return this.http.get<{ totalOrders: number }>(
      this.apiUrl + '/count',
      {
        headers: this.httpHeaderService.getHeaders(),
        params
      }
    );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  createOrder(order: Omit<Order, 'order_id' | 'createdAt' | 'updatedAt'>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order, { headers: this.httpHeaderService.getHeaders() });
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${this.apiUrl}/${order.order_id}`,
      order,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}
