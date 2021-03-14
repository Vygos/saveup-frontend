import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JWT } from './jwt.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
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
    this.storage.set(this.ACCESS_TOKEN, token);
  }

  setRefreshToken(token: string) {
    this.storage.set(this.REFRESH_TOKEN, token);
  }
}
