import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from '../services/auth/keycloak.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    
    if (isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}