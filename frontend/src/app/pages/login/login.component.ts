import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-redirect',
  styleUrls: ['./login.component.scss'], // ← aquí está el cambio
  templateUrl: './login.component.html'  // ← también se debe corregir si este es un path, no un string literal del template
})
export class LoginRedirectComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const loggedIn = await this.authService.isLoggedIn();
    const token = await this.authService.getToken();
    console.log('Token:', token);
    console.log('Estado de autenticación:');

    if (loggedIn) {
      console.log('Ya autenticado, redirigiendo a la página de inicio');
      this.router.navigate(['/']);
    } else {
      console.log('Sin autenticación, redirigiendo al login de Keycloak');
      this.authService.login();
    }
  }
}
