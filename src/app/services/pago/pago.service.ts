import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  API_URL = 'http://localhost:2200/api/pago';

  constructor(private http: HttpClient) { }

  realizarPagoVariosADMIN(pago: any){
    return this.http.post(`${this.API_URL}/realizarPago`,pago);
  }

}
