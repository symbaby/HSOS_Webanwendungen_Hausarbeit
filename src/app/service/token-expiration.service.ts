import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class TokenExpirationService {

  constructor(private router: Router) {
  }

  async checkTokenExpiration(): Promise<boolean> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return false;
    }

    // Decode the token to get the expiration time
    const decodedToken = this.decodeJWT(token);
    if (!decodedToken) {
      return false;
    }

    // Check if the token has expired
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > expirationTime) {
      await this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
