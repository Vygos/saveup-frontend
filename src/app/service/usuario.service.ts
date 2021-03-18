import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  salvar(usuario: Usuario, headers?: HttpHeaders): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/usuario`, usuario, {
      headers,
    });
  }

  existsByEmail(email: string): Observable<boolean> {
    const params = new HttpParams().append('email', email);
    return this.http.get<boolean>(`${environment.apiUrl}/usuario/existsByEmail`, {
      params,
    });
  }
}
