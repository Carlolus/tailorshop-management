import { Injectable, NgZone } from '@angular/core';
import { HttpHeaderService } from '../httpHeader';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GarmentReferenceUploadService {
  private uploadUrl = 'http://localhost:3000/uploads/garments'; // o /upload/garment si hiciste rutas separadas

  constructor(private http: HttpClient, private headerService: HttpHeaderService) {}

  uploadImage(formData: FormData): Observable<{ url: string }> {
  return this.http.post<{ url: string }>(this.uploadUrl, formData, {
    // Solo envía headers estrictamente necesarios (como Authorization)
    headers: this.headerService.getHeaders().delete('Content-Type') 
  });
}
}
