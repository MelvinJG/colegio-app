import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { UserAuthService } from '../services/userAuth/user-auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor(private router: Router, private API_USER_AUTH: UserAuthService){}

  canActivate(route: ActivatedRouteSnapshot): boolean{
    const expectedRole = ['route.data.expectedRole'];
    const token = localStorage.getItem('token');

    const decodeToken = decode(token);
    const userName = JSON.parse(JSON.stringify(decodeToken)).userName;
    const roleId = JSON.parse(JSON.stringify(decodeToken)).roleId;
    const id_usuario = JSON.parse(JSON.stringify(decodeToken)).id_usuario;

    console.log("userName -> ",userName)
    console.log("roleId -> ",roleId)
    console.log("id_usuario -> ",id_usuario)
    return true;
  }
  
}
