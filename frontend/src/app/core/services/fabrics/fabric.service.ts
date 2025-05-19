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
  ){ }

  getFabrics(): Observable<Fabric[]> {
    return this.http.get<Fabric[]>(this.apiUrl);
  }

  createFabric(fabric: Omit<Fabric, 'fabric_id'>): Observable<Fabric> {
    return this.http.post<Fabric>(this.apiUrl, fabric);
  }

  updateFabric(fabric: Fabric): Observable<Fabric> {
    return this.http.put<Fabric>(`${this.apiUrl}/${fabric.fabric_id}`, fabric);
  }

  deleteFabric(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}