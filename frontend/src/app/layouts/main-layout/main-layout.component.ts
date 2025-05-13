import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
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

  constructor(private AuthService: AuthService) {
    this.AuthService.isLoggedIn().then(logged => {
      this.isLoggedIn = logged;
    });
  }

  login() {
    this.AuthService.login();
  }

  logout() {
    this.AuthService.logout();
  }
}
