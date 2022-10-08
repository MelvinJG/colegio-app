import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// Interfaz
import { Alumno } from '../../models/Alumno';
import { Encargado } from '../../models/Encargado';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  API_URL = 'http://localhost:2200/api/alumnoEncargado';

  constructor(private http: HttpClient) { }

  // Obtener alumnos por grado
  getAlumnosPorGrado(idGrado: string){
    return this.http.get(`${this.API_URL}/getAlumnosPorGrado/${idGrado}`);
  }

  addAlumno(alumno: Alumno){
    return this.http.post(`${this.API_URL}/addAlumno`,alumno);
  }

  // encargados
  addEncargado(encargado: Encargado){
    return this.http.post(`${this.API_URL}/addEncargado`,encargado);
  }

  getEncargadoPorDPI(dpiEncargado: string){
    return this.http.get(`${this.API_URL}/getEncargadoDPI/${dpiEncargado}`);
  }

  updateEncargado(dpiEncargado: string, encargado: Encargado){
    return this.http.put(`${this.API_URL}/updateEncargado/${dpiEncargado}`,encargado);
  }

}
