import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  // API_URL = 'http://localhost:2200/api/pago';

  NGROK = 'https://cbb9-190-121-193-214.ngrok.io'
  API_URL = `${this.NGROK}/api/pago`;

  constructor(private http: HttpClient) { }

  realizarPagoVariosADMIN(pago: any){
    return this.http.post(`${this.API_URL}/realizarPago`,pago);
  }

}
