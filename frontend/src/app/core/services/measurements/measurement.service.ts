import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Measurement } from '../../models/measurement.model';
import { HttpHeaderService } from '../httpHeader';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private apiUrl = 'http://localhost:3000/measurements';

  constructor(
    private http: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) { }

  getMeasurements(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(this.apiUrl, { headers: this.httpHeaderService.getHeaders() });
  }

  getMeasurementByGarmentId(garmentId: number): Observable<Measurement> {
    return this.http.get<Measurement>(
      `${this.apiUrl}/${garmentId}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  createMeasurement(measurement: Measurement): Observable<Measurement> {
    return this.http.post<Measurement>(this.apiUrl, measurement, { headers: this.httpHeaderService.getHeaders() });
  }

  updateMeasurement(measurement: Measurement): Observable<Measurement> {
    return this.http.put<Measurement>(
      `${this.apiUrl}/${measurement.garment_id}`,
      measurement,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  deleteMeasurement(garmentId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${garmentId}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}
