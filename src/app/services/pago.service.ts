import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  API_URL = 'http://localhost:2200/api/pago';

  // NGROK = 'https://cbb9-190-121-193-214.ngrok.io'
  // API_URL = `${this.NGROK}/api/pago`;

  constructor(private http: HttpClient) { }

  realizarPagoVariosADMIN(pago: any){
    return this.http.post(`${this.API_URL}/realizarPago`,pago);
  }

  realizarPagoApp(pago: any){
    return this.http.post(`${this.API_URL}/realizarPagoApp`,pago);
  }

  getAllPagosApp(){
    return this.http.get(`${this.API_URL}/getAllPagosApp`);
  }

  getPagosAppAlumno(cuiAlumno: string){
    return this.http.get(`${this.API_URL}/getPagosAppAlumno/${cuiAlumno}`);
  }

  countAllPagosApp(){
    return this.http.get(`${this.API_URL}/countAllPagosApp`);
  }

  cancelarEnvio(comprobanteID: number){
    return this.http.put(`${this.API_URL}/cancelarEnvio/${comprobanteID}`,null);
  }

  rechazarComprobante(comprobanteID: number, comprobante: any){
    return this.http.put(`${this.API_URL}/rechazarComprobante/${comprobanteID}`,comprobante);
  }

  aceptarComprobante(comprobanteID: number, comprobante: any){
    return this.http.put(`${this.API_URL}/aceptarComprobante/${comprobanteID}`,comprobante);
  }
}
