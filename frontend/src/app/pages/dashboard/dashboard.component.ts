import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakService } from '../../core/services/auth/keycloak.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
