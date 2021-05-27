import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page.model';
import { TipoDespesa } from '../models/tipo-despesa.model';

@Injectable({
  providedIn: 'root',
})
export class TipoDespesaService {
  constructor(private http: HttpClient) {}

  findAll(
    page: Page<TipoDespesa>,
    nome: string = null
  ): Observable<Page<TipoDespesa>> {
    let params = new HttpParams()
      .append('page', page.number.toString())
      .append('size', page.size.toString());

    if (nome) {
      params = new HttpParams()
        .append('page', page.number.toString())
        .append('size', page.size.toString())
        .append('nome', nome);
    }

    return this.http.get<Page<TipoDespesa>>(
      `${environment.apiUrl}/tipo-despesa/findAllByFilter`,
      { params }
    );
  }

  findAllDefault(): Observable<TipoDespesa[]> {
    return this.http.get<TipoDespesa[]>(
      `${environment.apiUrl}/tipo-despesa/findAll`
    );
  }

  isAlreadyExistsByNome(nome: string): Observable<boolean> {
    const params = new HttpParams().append('nome', nome);
    return this.http.get<boolean>(
      `${environment.apiUrl}/tipo-despesa/isAlreadyExistsByNome`,
      { params }
    );
  }

  findById(id: number): Observable<TipoDespesa> {
    return this.http.get<TipoDespesa>(
      `${environment.apiUrl}/tipo-despesa/${id}`
    );
  }

  salvar(nome: string): Observable<TipoDespesa> {
    return this.http.post<TipoDespesa>(`${environment.apiUrl}/tipo-despesa`, {
      nome,
    });
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/tipo-despesa/${id}`);
  }

  atualizarById(tipoDespesa: TipoDespesa): Observable<any> {
    const { id, nome } = tipoDespesa;
    const url = `${environment.apiUrl}/tipo-despesa/${id}`;

    return this.http.patch(url, {
      nome,
    });
  }
}
