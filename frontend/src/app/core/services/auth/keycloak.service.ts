import { Injectable, NgZone } from '@angular/core';
import Keycloak from 'keycloak-js';
import { fromEvent, merge, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak: Keycloak;

  private idleTimeoutMs = 10 * 60 * 1000;

  private idleTimerSub?: Subscription;
  private activitySub?: Subscription;

  private isMonitoring = false;

  constructor(private ngZone: NgZone) {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'tailorshop',
      clientId: 'tailorshop-api'
    });
  }

  init(): Promise<boolean> {
    return this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      checkLoginIframe: false,
    }).then(authenticated => {
      if (authenticated) {
        this.scheduleTokenRefresh();
        this.startIdleMonitoring();
      }
      return authenticated;
    });
  }

  getKeycloak() {
    return this.keycloak;
  }

  getToken() {
    return this.keycloak.token;
  }

  login() {
    this.keycloak.login({
      redirectUri: window.location.origin + '/admin'
    });
  }

  getUsername() {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }

  getEmail() {
    return this.keycloak.tokenParsed?.['email'];
  }

  logout(reason: 'idle' | 'normal') {
    this.stopIdleMonitoring();
    const redirectUri = reason === 'idle'
      ? window.location.origin + '/session-expired'
      : window.location.origin;
    this.keycloak.logout({ redirectUri });
  }

  isLoggedIn(): boolean {
    return !!this.keycloak.token;
  }

  private scheduleTokenRefresh(): void {
    const refreshInterval = 60 * 1000;
    setInterval(() => {
      this.keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          console.log('[Keycloak] Token was successfully refreshed');
        }
      }).catch(() => {
        console.warn('[Keycloak] Token refresh failed; logging out');
        this.logout('normal');
      });
    }, refreshInterval);
  }

  private startIdleMonitoring() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;

    this.ngZone.runOutsideAngular(() => {
      const activityEvents = ['mousemove', 'mousedown', 'keypress', 'touchstart'];
      const activity$ = merge(...activityEvents.map(event => fromEvent(document, event)));

      this.activitySub = activity$.subscribe(() => this.resetIdleTimer());
      this.resetIdleTimer();
    });
  }

  private stopIdleMonitoring() {
    this.idleTimerSub?.unsubscribe();
    this.activitySub?.unsubscribe();
    this.isMonitoring = false;
  }

  resetIdleTimer() {
    this.idleTimerSub?.unsubscribe();
    this.idleTimerSub = timer(this.idleTimeoutMs).subscribe(() => {
      this.ngZone.run(() => this.logout('idle'));
    });
  }
}
