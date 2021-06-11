import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { AccessToken, JWT } from './jwt.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private jwtHelperService: JwtHelperService
  ) {}

  getToken(email: string, password: string): Observable<JWT> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic c2F2ZXVwOnNhdmV1cC1iYWNrZW5k');

    let grant_type = 'password';

    const body = `username=${email}&password=${password}&grant_type=${grant_type}`;

    return this.http.post<JWT>(`${environment.apiUrl}/oauth/token`, body, {
      headers: headers,
    });
  }

  setAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  setRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getAccessTokenDecoded(): AccessToken {
    let accessToken = this.getAccessToken();

    if (!accessToken) {
      return;
    }

    return this.jwtHelperService.decodeToken<AccessToken>(accessToken);
  }

  isTokenExpired(): boolean {
    if (!this.getAccessToken()) {
      return true;
    }

    return this.jwtHelperService.isTokenExpired(this.getAccessToken());
  }

  getLoggedUser(): Usuario {
    let accessToken = this.getAccessToken();

    if (!accessToken) {
      return;
    }

    const decodedToken = this.jwtHelperService.decodeToken(accessToken);

    return {
      id: decodedToken.id,
      email: decodedToken.email,
      nome: decodedToken.nome,
    };
  }
}
