import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserAuthService } from '../../../services/user-auth.service';
// Interfaz
import { Usuario } from '../../../models/Usuario';
// Validar Form
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

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

  validationForm: FormGroup;
  constructor(private router: Router, private API_USER_AUTH: UserAuthService) {
    this.validationForm = new FormGroup({
      user: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      passw: new FormControl(null, { validators: Validators.required, updateOn: 'submit' })
    });
  }

  ngOnInit(): void {}

  get user(): AbstractControl {
    return this.validationForm.get('user')!;
  }

  get passw(): AbstractControl {
    return this.validationForm.get('passw')!;
  }

  iniciarSesion(){
    console.log("Datos iniciarSesion -> ", this.usuario)
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();

    this.validationForm.get('user').valueChanges.subscribe(val => {
      this.usuario.userName = val;
    })
    this.validationForm.get('passw').valueChanges.subscribe(val => {
      this.usuario.pass = val;
    })
    
    
    console.log("Datos SUBMIT -> ", this.usuario)
    if(this.usuario.userName !== "" && this.usuario.pass !== ""){
      console.log("Iniciar sesion")
      
    }
  }
}

// this.API_USER_AUTH.singin(this.usuario).subscribe(
//   res => {
//     let JSONresponse = JSON.parse(JSON.stringify(res));
//     Swal.fire({
//       icon: 'success',
//       title: 'Bienvenido',
//       text: JSONresponse.data
//     })
//   },
//   err => {
//     console.log("ERROR INICIO DE SESION -> ",err)
//     if(err.status === 404){
//       Swal.fire({
//         icon: 'info',
//         title: 'Oops...',
//         text: err.error.message
//       })
//     } else{
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: '¡Algo salió mal!'
//       })
//     }
//   }
// );