import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AnuncioTareaService {

  // API_URL = 'http://localhost:2200/api/anuncioTarea';

  NGROK = 'https://cbb9-190-121-193-214.ngrok.io'
  API_URL = `${this.NGROK}/api/anuncioTarea`;

  constructor(private http: HttpClient) { }

  getTareaAnuncio(dpiProfesor: string){
    return this.http.get(`${this.API_URL}/getTareaAnuncio/${dpiProfesor}`);
  }
}
