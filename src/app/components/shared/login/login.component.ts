import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserAuthService } from '../../../services/userAuth/user-auth.service';
// Interfaz
import { Usuario } from '../../../models/Usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {
    userName: '',
    pass: ''
  }

  constructor(private router: Router, private API_USER_AUTH: UserAuthService) {}

  ngOnInit(): void {}

  iniciarSesion(){
    if(this.usuario.userName !== "" && this.usuario.pass !== ""){
      this.API_USER_AUTH.singin(this.usuario).subscribe(
        res => {
          localStorage.setItem('token',JSON.parse(JSON.stringify(res)).data.token);
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 12000
          });
          // this.router.navigate(['/home']);
        },
        err => {
          // console.log("ERROR INICIO DE SESION -> ",err)
          if(err.status === 404){
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: err.error.message
            })
          } else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo salió mal!'
            })
          }
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Ingrese usuario y contraseña.'
      })
    }
  }

}
