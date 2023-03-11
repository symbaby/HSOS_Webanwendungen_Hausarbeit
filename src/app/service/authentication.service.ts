import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

const TOKEN_KEY = 'my-token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  access_token = '';

  constructor(private httpClient: HttpClient) {
    this.loadToken();
  }

  loadToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.access_token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { username: any; password: any}): Observable<any> {
      const body = new HttpParams()
        .set('username', credentials.username)
        .set('password', credentials.password)
        .set('grant_type', 'password')
        .set('scope', 'openid');

      const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('frontend-ionic:perm')
    });

    return this.httpClient.post("http://localhost:8180/realms/quarkus/protocol/openid-connect/token", body.toString(), {headers}).pipe(
      map((data: any) => data.access_token),
      tap((access_token) => {
        localStorage.setItem(TOKEN_KEY, access_token);
        this.isAuthenticated.next(true);
      })
    );
  }

  /*
  login(credentials: { email; password }): Observable<any> {
		return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
			map((data: any) => data.token),
			switchMap((token) => {
				return from(Storage.set({ key: TOKEN_KEY, value: token }));
			}),
			tap((_) => {
				this.isAuthenticated.next(true);
			})
		);
	}
   */



  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem(TOKEN_KEY);
  }

}
