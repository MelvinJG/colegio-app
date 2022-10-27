import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// Interfaz
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  API_URL = 'http://localhost:2200/api/empleado';

  // NGROK = 'https://cbb9-190-121-193-214.ngrok.io'
  // API_URL = `${this.NGROK}/api/empleado`;

  constructor(private http: HttpClient) { }

  getEmpleados(){
    return this.http.get(`${this.API_URL}/getEmpleados`);
  }

  addEmpleado(empleado: Empleado){
    return this.http.post(`${this.API_URL}/addEmpleado`,empleado);
  }

  getDetalleUltimoPagoEmpleado(dpiEmpleado: string){
    return this.http.get(`${this.API_URL}/getDetalleUltimoPagoEmpleado/${dpiEmpleado}`);
  }

  getProfesoresPorGrado(idGrado: string){
    return this.http.get(`${this.API_URL}/getProfesoresPorGrado/${idGrado}`);
  }
}
