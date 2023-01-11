import { Orcamento } from './orcamento.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY, throwError } from "rxjs";


@Injectable({
  providedIn: "root",
})

export class OrcamentoService {

  baseUrl = "https://localhost:7020/";

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }


  getProdutos(anoConsult: number): Observable<Orcamento[]> {
    return this.httpClient.get<Orcamento[]>(`${this.baseUrl}Get?ano=${anoConsult}`);
  }

  getByYear(anoConsult: number): Observable<Orcamento[]> {
    return this.httpClient.get<Orcamento[]>(`${this.baseUrl}GetByYear?ano=${anoConsult}`);
  }

  getCountRecord(anoConsult: number): Observable<Orcamento>{
    return this.httpClient.get<Orcamento>(`${this.baseUrl}GetCountRecord?ano=${anoConsult}`);
  }
}

