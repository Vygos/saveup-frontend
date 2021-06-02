import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Financa } from '../models/financa.model';

@Injectable({
  providedIn: 'root'
})
export class FinancaService {

  constructor(private http: HttpClient) { }

  findAll(id: number): Observable<Financa[]> {
    return this.http.get<Financa[]>(`${environment.apiUrl}/financa/${id}`);
  }

  listYears(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/financa/listarAnos/${id}`);
  }

  create(financa: Financa): Observable<Financa> {
    return this.http.post<Financa>(`${environment.apiUrl}/financa/`, financa);
  }

  patch(financa: Financa): Observable<Financa> {
    return this.http.patch<Financa>(`${environment.apiUrl}/financa/`, financa);
  }

}
