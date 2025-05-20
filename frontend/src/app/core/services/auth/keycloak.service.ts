import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak: Keycloak;

  constructor() {  
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'tailorshop',
      clientId: 'tailorshop-api'
    });
  }

  init(): Promise <boolean> {
    return this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
    });
  }

  getKeycloak(){
    return this.keycloak;
  }

  getToken(){
    return this.keycloak.token;
  }

  login(){
    this.keycloak.login({
      redirectUri: window.location.origin + '/admin'
    });
  }

  logout(){
    this.keycloak.logout({
     redirectUri: window.location.origin
    });
  }

  isLoggedIn(): boolean {
    return !!this.keycloak.token;
  }
}
