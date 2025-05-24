import { Component, OnInit, HostListener } from '@angular/core';
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
export class MainLayoutComponent implements OnInit {
  isLoggedIn = false;
  isMobileMenuOpen = false;
  isUserMenuOpen = false;
  username = "";
  mail = "";

  constructor(private keycloackService: KeycloakService) { }

  ngOnInit() {
    this.checkAuthStatus();
  }

  // Escuchar clics fuera de los menús para cerrarlos
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    // Cerrar menú de usuario si se hace clic fuera
    if (this.isUserMenuOpen && !target.closest('.user-menu')) {
      this.isUserMenuOpen = false;
    }
  }

  // Escuchar la tecla Escape para cerrar menús
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    this.closeAllMenus();
  }

  checkAuthStatus() {
    if (this.keycloackService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.keycloackService.getUsername();
      this.mail = this.keycloackService.getEmail();
    }
  }

  login() {
    this.keycloackService.login();
  }

  logout() {
    this.keycloackService.logout('normal');
    this.closeAllMenus();
  }

  // Menú móvil
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Cerrar menú de usuario si está abierto
    if (this.isUserMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Menú de usuario
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    // Cerrar menú móvil si está abierto
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  // Cerrar todos los menús
  closeAllMenus() {
    this.isMobileMenuOpen = false;
    this.isUserMenuOpen = false;
  }
}