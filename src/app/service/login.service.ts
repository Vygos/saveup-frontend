import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthorizationService } from './authorization.service';
import { JWT } from './jwt.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authorization: AuthorizationService) {}

  entrar(dados: { email: string; senha: string }): Observable<JWT> {
    return this.authorization
      .getToken(dados.email, dados.senha)
      .pipe(delay(1000));
  }
}
