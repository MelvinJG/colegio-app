import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import { Game } from '../Models/Games'; interfaz para agregar o actualizar datos

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

}
