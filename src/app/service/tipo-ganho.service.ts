import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page.model';
import { TipoGanho } from '../models/tipo-ganho.model';

@Injectable({
  providedIn: 'root',
})
export class TipoGanhoService {
  constructor(private http: HttpClient) {}

  salvar(tipoGanho: TipoGanho): Observable<TipoGanho> {
    return this.http.post<TipoGanho>(
      `${environment.apiUrl}/tipo-ganho`,
      tipoGanho
    );
  }

  findAll<T>(page: Page<T>): Observable<Page<T>> {
    const params = new HttpParams()
      .append('page', page.number.toString())
      .append('size', page.size.toString());

    return this.http.get<Page<T>>(
      `${environment.apiUrl}/tipo-ganho/findAllByEmail`,
      {
        params,
      }
    );
  }

  isAlreadyExistsByNome(nome: string): Observable<boolean> {
    const params = new HttpParams().append('nome', nome);

    return this.http.get<boolean>(
      `${environment.apiUrl}/tipo-ganho/isAlreadyExistsByNome`,
      {
        params,
      }
    );
  }
}
