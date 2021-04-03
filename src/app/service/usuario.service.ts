import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjectDTO } from '../models/objectdto.model';
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
    return this.http.get<boolean>(
      `${environment.apiUrl}/usuario/existsByEmail`,
      {
        params,
      }
    );
  }

  findByEmail(email: string): Observable<Usuario> {
    const params = new HttpParams().append('email', email);
    return this.http.get<Usuario>(`${environment.apiUrl}/usuario/findByEmail`, {
      params,
    });
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/usuario/${id}`);
  }

  atualizar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.patch<Usuario>(
      `${environment.apiUrl}/usuario/${id}`,
      usuario
    );
  }

  upload(id: number, file: File): Observable<ObjectDTO> {
    const formData = new FormData();
    formData.append('arquivo', file);

    return this.http.post<ObjectDTO>(
      `${environment.apiUrl}/usuario/${id}/upload`,
      formData
    );
  }
}
