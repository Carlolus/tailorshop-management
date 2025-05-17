import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloakService } from '../../core/services/auth/keycloak.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isLoggedIn = false;

  constructor(private keycloackService: KeycloakService) {
    if (this.keycloackService.isLoggedIn()){
      this.isLoggedIn = true;
    };
  }

  login() {
    this.keycloackService.login();
  }

  logout() {
    this.keycloackService.logout();
  }
}
