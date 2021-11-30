import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Charge } from './charge.model';
import { Qrcode } from './qrcode.model';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  baseUrl = "http://localhost:4200/api";

  constructor(private snackbar: MatSnackBar,
    private http: HttpClient) { }

  create(Charge: Charge): Observable<any> {
    return this.http.post<Charge>(`${this.baseUrl}/criar_cobranca`, Charge);
  }

  read(): Observable<Charge[]> {
    return this.http.get<Charge[]>(`${this.baseUrl}/cobrancas`);
  }

  qrCode(id: string): Observable<Qrcode> {
    const url = `${this.baseUrl}/cobrancas/${id}`;
    return this.http.get<Qrcode>(url);
  }

  update(Charge: Charge): Observable<Charge> {
    const url = `${this.baseUrl}/${Charge.id}`;
    return this.http.put<Charge>(url, Charge);
  }

  delete(id: string): Observable<Charge> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Charge>(url);
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

}
