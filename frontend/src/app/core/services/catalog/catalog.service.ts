import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogItem } from '../../models/catalog.model';
import { HttpHeaderService } from '../httpHeader';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = 'http://localhost:3000/';

    constructor(
    private http: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) {}

  getCatalog(): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>(`${this.apiUrl}catalogs`, { headers: this.httpHeaderService.getHeaders() });
  }

  // catalog.service.ts
  createCatalogItem(item: CatalogItem): Observable<CatalogItem> {
    return this.http.post<CatalogItem>(`${this.apiUrl}catalogs`, item, { headers: this.httpHeaderService.getHeaders() });
  }

  updateCatalogItem(item: CatalogItem): Observable<CatalogItem> {
    return this.http.put<CatalogItem>(`${this.apiUrl}catalogs/${item.item_id}`, item, { headers: this.httpHeaderService.getHeaders() });
  }

  deleteCatalogItem(id: number): Observable<void> {
    console.log('Deleting catalog item with ID:', id);
    return this.http.delete<void>(`${this.apiUrl}catalogs/${id}`, { headers: this.httpHeaderService.getHeaders() });
  }

}
