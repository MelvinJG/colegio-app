import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  API_URL = 'http://localhost:2200/api/reporteADMIN';

  // NGROK = 'https://cbb9-190-121-193-214.ngrok.io'
  // API_URL = `${this.NGROK}/api/reporteADMIN`;

  constructor(private http: HttpClient) { }

  getIngresoEgreso(){
    return this.http.get(`${this.API_URL}/getIngresoEgreso`);
  }

  getSolventeInsolvente(){
    return this.http.get(`${this.API_URL}/getSolventeInsolvente`);
  }

  getOrigenPago(){
    return this.http.get(`${this.API_URL}/getOrigenPago`);
  }

  getCantidadAlumnoEmpleado(){
    return this.http.get(`${this.API_URL}/getCantidadAlumnoEmpleado`);
  }
}

