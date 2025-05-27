import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garment } from '../../models/garment.model';
import { HttpHeaderService } from '../httpHeader';

@Injectable({
  providedIn: 'root'
})
export class GarmentService {
  private apiUrl = 'http://localhost:3000/garments';

  constructor(
    private http: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) { }

  getGarments(): Observable<Garment[]> {
    return this.http.get<Garment[]>(this.apiUrl, { headers: this.httpHeaderService.getHeaders() });
  }

  createGarment(garment: Omit<Garment, 'garment_id'>): Observable<Garment> {
    return this.http.post<Garment>(this.apiUrl, garment, { headers: this.httpHeaderService.getHeaders() });
  }

  updateGarment(garment: Garment): Observable<Garment> {
    return this.http.put<Garment>(
      `${this.apiUrl}/${garment.garment_id}`,
      garment,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  deleteGarment(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  getGarmentById(id: number): Observable<Garment> {
    return this.http.get<Garment>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}
