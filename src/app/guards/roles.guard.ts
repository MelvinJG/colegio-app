import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor(private API_USER_AUTH: UserAuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot): boolean{
    const expectedRole = route.data['expectedRole'];
    const decodeToken = decode(localStorage.getItem('token'));
    const roleId = JSON.parse(JSON.stringify(decodeToken)).roleId;
    if(!this.API_USER_AUTH.isAuth() || roleId !== expectedRole){
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: "Usuario no Autorizado para la Vista."
      })
      this.router.navigate(['/home'])
      // this.router.navigate(['shared/error',]) V2.0 mostrar esta vista de error // private router: Router, // import { Router } from '@angular/router';
      return false;
    }
    return true;
  }
}
