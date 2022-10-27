import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import { Game } from '../Models/Games'; interfaz para agregar o actualizar datos

@Injectable({
  providedIn: 'root'
})
export class InfoExtraService {

  // API_URL = 'http://localhost:2200/api/infoExtra';

  NGROK = 'https://cbb9-190-121-193-214.ngrok.io'
  API_URL = `${this.NGROK}/api/infoExtra`;

  constructor(private http: HttpClient) { }

  // Obtener todos los grados del colegio
  getGrados(){
    return this.http.get(`${this.API_URL}/getGrados`);
  }

  getCursosPorIDGrado(IdGrado: string){
    return this.http.get(`${this.API_URL}/getCursosPorGrado/${IdGrado}`);
  }

  // Subir fotos a AWS S3
  uploadPhotoToS3(File: any){
    const formData = new FormData();
    formData.append("image", File);
    return this.http.post(`${this.API_URL}/foto/uploadPhotoToS3`, formData);
  }

  // Obtener meses pendientes de pago de los ALUMNOS
  getMesesPendientesPagoAlumno(cuiAlumno: string){
    return this.http.get(`${this.API_URL}/getMesesPendientesPagoAlumno/${cuiAlumno}`);
  }

  // Obtener meses pendientes de pago de los ALUMNOS
  getMesesPendientesPagoEmpleado(dpiEmpleado: string){
    return this.http.get(`${this.API_URL}/getMesesPendientesPagoEmpleado/${dpiEmpleado}`);
  }

  // Obtener los grados asignados al profesor
  getGradosPROF(dpiProfesor: string){
    return this.http.get(`${this.API_URL}/getGradosPROF/${dpiProfesor}`);
  }
}
