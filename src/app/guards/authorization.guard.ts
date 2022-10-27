import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router, private API_USER_AUTH: UserAuthService){}

  canActivate(): boolean {
    if(!this.API_USER_AUTH.isAuth()){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Inicie Sesión"
      })
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
