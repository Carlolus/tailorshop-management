import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { KeycloakService } from './auth/keycloak.service';

@Injectable({ providedIn: 'root' })
export class HttpHeaderService {
  constructor(private keycloakService: KeycloakService) {}

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.keycloakService.getToken()}`
    });
  }
}
