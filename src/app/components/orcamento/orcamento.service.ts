import { Orcamento } from './orcamento.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

export class OrcamentoService {
  
  baseUrl = "https://localhost:7020/mvt";
  defaultRoute = "api/Reserva";
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': "*" })
  }

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  getProdutos(): Observable<Orcamento[]>{
    return this.httpClient.get<Orcamento[]>(this.baseUrl).pipe( catchError(this.handleError)
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}

