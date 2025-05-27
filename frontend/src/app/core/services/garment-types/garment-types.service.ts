import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GarmentType } from '../../models/garment-type.model';
import { HttpHeaderService } from '../httpHeader';

@Injectable({
  providedIn: 'root'
})
export class GarmentTypeService {
  private apiUrl = 'http://localhost:3000/garmentstypes';

  constructor(
    private http: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) { }

  getGarmentTypes(): Observable<GarmentType[]> {
    return this.http.get<GarmentType[]>(this.apiUrl, { headers: this.httpHeaderService.getHeaders() });
  }

  createGarmentType(garmentType: Omit<GarmentType, 'garment_type_id'>): Observable<GarmentType> {
    return this.http.post<GarmentType>(this.apiUrl, garmentType, { headers: this.httpHeaderService.getHeaders() });
  }

  updateGarmentType(garmentType: GarmentType): Observable<GarmentType> {
    return this.http.put<GarmentType>(
      `${this.apiUrl}/${garmentType.garment_type_id}`,
      garmentType,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  deleteGarmentType(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  getGarmentTypeById(id: number): Observable<GarmentType> {
    return this.http.get<GarmentType>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}
