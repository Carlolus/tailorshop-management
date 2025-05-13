import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    
    
    keycloakService: KeycloakService;
    httpClient: HttpClient;

    constructor(keycloakService: KeycloakService, httpClient: HttpClient) {
      this.keycloakService = keycloakService;
      this.httpClient = httpClient;
    }

    public login(): void {
      this.keycloakService.login();
    }

    public logout(): void {
      this.keycloakService.logout();
    }

    public async isLoggedIn(): Promise<boolean> {
      return await this.keycloakService.isLoggedIn();
    }

    public getToken(): Promise<string> {
      return this.keycloakService.getToken();
    }
}
