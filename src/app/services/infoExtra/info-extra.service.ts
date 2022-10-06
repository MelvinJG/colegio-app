import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import { Game } from '../Models/Games'; interfaz para agregar o actualizar datos

@Injectable({
  providedIn: 'root'
})
export class InfoExtraService {

  API_URL = 'http://localhost:2200/api/infoExtra';

  constructor(private http: HttpClient) { }

  // Obtener todos los grados del colegio
  getGrados(){
    return this.http.get(`${this.API_URL}/getGrados`);
  }

  // Subir fotos a AWS S3
  uploadPhotoToS3(File: any){
    const formData = new FormData();
    formData.append("image", File);
    return this.http.post(`${this.API_URL}/foto/uploadPhotoToS3`, formData);
  }
}
