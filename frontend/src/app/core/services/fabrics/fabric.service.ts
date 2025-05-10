import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getFabrics(): Observable<any> {
    const url = `${this.apiUrl}fabrics`
    return this.http.get(url);
  }
}