import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fabric } from '../../models/fabric.model';
import { HttpHeaderService } from '../httpHeader';

@Injectable({
  providedIn: 'root'
})
export class FabricService {
  private apiUrl = 'http://localhost:3000/fabrics';

  constructor(
    private http: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) {}

  getFabrics(): Observable<Fabric[]> {
    return this.http.get<Fabric[]>(this.apiUrl, { headers: this.httpHeaderService.getHeaders() });
  }

  createFabric(fabric: Omit<Fabric, 'fabric_id'>): Observable<Fabric> {
    return this.http.post<Fabric>(this.apiUrl, fabric, { headers: this.httpHeaderService.getHeaders() });
  }

  updateFabric(fabric: Fabric): Observable<Fabric> {
    return this.http.put<Fabric>(
      `${this.apiUrl}/${fabric.fabric_id}`,
      fabric,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  deleteFabric(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}
