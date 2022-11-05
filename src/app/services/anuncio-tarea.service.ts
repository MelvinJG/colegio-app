import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AnuncioTarea } from '../models/AnuncioTarea';

@Injectable({
  providedIn: 'root'
})
export class AnuncioTareaService {

  API_URL = 'http://localhost:2200/api/anuncioTarea';

  // NGROK = 'https://cbb9-190-121-193-214.ngrok.io'
  // API_URL = `${this.NGROK}/api/anuncioTarea`;

  constructor(private http: HttpClient) { }

  getTareaAnuncio(dpiProfesor: string){
    return this.http.get(`${this.API_URL}/getTareaAnuncio/${dpiProfesor}`);
  }

  getTareas(dpiProfesor: string){
    return this.http.get(`${this.API_URL}/getTareas/${dpiProfesor}`);
  }

  publicarTareaAnuncio(publicacion: AnuncioTarea){
    return this.http.post(`${this.API_URL}/publicarTareaAnuncio`,publicacion);
  }

  calificarTarea(calificacion: any){
    return this.http.post(`${this.API_URL}/calificarTarea`,calificacion);
  }

  getTareasPorGrado(cuiAlumno: string){
    return this.http.get(`${this.API_URL}/getTareasPorGrado/${cuiAlumno}`);
  }

  getAnunciosPorGrado(cuiAlumno: string){
    return this.http.get(`${this.API_URL}/getAnunciosPorGrado/${cuiAlumno}`);
  }

  getPunteoTarea(tareaID: number, cuiAlumno: string){
    return this.http.get(`${this.API_URL}/getPunteoTarea/${tareaID}/${cuiAlumno}`);
  }
}
