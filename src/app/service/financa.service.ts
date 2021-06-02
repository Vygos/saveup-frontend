import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chart } from '../models/chart.model';
import { Financa } from '../models/financa.model';

@Injectable({
  providedIn: 'root'
})
export class FinancaService {

  constructor(private http: HttpClient) { }

  findByYear(id: number, ano: string): Observable<Financa[]> {
    const params = new HttpParams().append("ano", ano);
    return this.http.get<Financa[]>(`${environment.apiUrl}/financa/${id}`, { params });
  }

  listYears(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/financa/listarAnos/${id}`);
  }

  chartData(id: number, ano: string): Observable<Chart[]> {
    const params = new HttpParams().append("ano", ano);
    return this.http.get<Chart[]>(`${environment.apiUrl}/financa/dataCharts/${id}`, { params })
  }

  create(financa: Financa): Observable<Financa> {
    return this.http.post<Financa>(`${environment.apiUrl}/financa/`, financa);
  }

  patch(financa: Financa): Observable<Financa> {
    return this.http.patch<Financa>(`${environment.apiUrl}/financa/`, financa);
  }

}
