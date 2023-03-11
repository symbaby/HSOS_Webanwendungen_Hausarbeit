import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {AuthenticationService} from "../service/authentication.service";
import {map} from 'rxjs/operators';
import {TokenExpirationService} from "../service/token-expiration.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthenticationService,
    private tokenExpirationService: TokenExpirationService,
    private router: Router) {
  }

  // Src: https://devdactic.com/ionic-5-navigation-with-login
  canLoad(): Observable<boolean> {
    return from(this.tokenExpirationService.checkTokenExpiration()).pipe(
      map((isAuthenticated) => {
        return isAuthenticated;
      })
    );
  }
}
