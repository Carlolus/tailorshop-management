import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { KeycloakService } from './app/core/services/auth/keycloak.service'; 
import { ApplicationConfig } from '@angular/core';

const keycloakService = new KeycloakService();

keycloakService.init().then(authenticated => {
  const config: ApplicationConfig = {
    ...appConfig,
    providers: [
      ...appConfig.providers!,
      { provide: KeycloakService, useValue: keycloakService }
    ]
  };
  bootstrapApplication(AppComponent, config);
});
