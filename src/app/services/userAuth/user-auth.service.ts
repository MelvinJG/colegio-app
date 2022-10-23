import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// Interfaz
import { Usuario } from '../../models/Usuario';
// JWT
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  API_URL = 'http://localhost:2200/api/usuarioAuth';

  constructor(private http: HttpClient, private JWTHelper: JwtHelperService) { }

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
}
