import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// Interfaz
import { Usuario } from '../../models/Usuario';
// JWT
import { JwtHelperService } from '@auth0/angular-jwt'
import decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  API_URL = 'http://localhost:2200/api/usuarioAuth';

  ShowNavigation: BehaviorSubject<any>;

  constructor(private http: HttpClient, private JWTHelper: JwtHelperService) { 
    this.ShowNavigation = new BehaviorSubject([]);
  }

  singin(user: Usuario){
    return this.http.post(`${this.API_URL}/singin`,user);
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if(this.JWTHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

  getUserName(){
    const decodeToken = decode(localStorage.getItem('token'));
    return JSON.parse(JSON.stringify(decodeToken)).userName;
  }

  getIdUsuario(){
    const decodeToken = decode(localStorage.getItem('token'));
    return JSON.parse(JSON.stringify(decodeToken)).id_usuario;
  }

  getIdRole(){
    const decodeToken = decode(localStorage.getItem('token'));
    return JSON.parse(JSON.stringify(decodeToken)).roleId;
  }

  getEmpFoto(){
    const decodeToken = decode(localStorage.getItem('token'));
    return JSON.parse(JSON.stringify(decodeToken)).EmpFoto;
  }

  getAlumFoto(){
    const decodeToken = decode(localStorage.getItem('token'));
    return JSON.parse(JSON.stringify(decodeToken)).AlumFoto;
  }
}
