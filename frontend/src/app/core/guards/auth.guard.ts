import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.AuthService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
