import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoExtraService } from 'src/app/services/info-extra.service';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {

  constructor(private API_USER_AUTH: UserAuthService, private API_PHOTO: InfoExtraService, private router: Router) { }

  public contrasenia: boolean = false;
  public perfil: boolean = false;
  foto: string = "";
  userName: string = "";
  verBotones: boolean = false;
  textDone: any = []; // Porcentaje de carga de la imagen
  lookTextPhoto: boolean = false; // Ver el TEXTO porcentaje de carga o no
  photo: string = ""; // Almacena URL foto del producto
  lookSpinner: boolean = false; // Ver la carga o no

  contra: any = {
    vieja: '',
    nueva: '',
    repetida: ''
  }

  HabilitarContra() {
    this.contrasenia = true;
    this.perfil = false;
    this.verBotones = true;
  }

  HabilitarPerfil() {
    this.contrasenia = false;
    if(this.API_USER_AUTH.getIdUsuario() === null) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Los Administradores no puden cambiar su foto de perfil.'
      });
      this.verBotones = false;
      this.perfil = false;
    } else { 
      this.perfil = true;
      this.verBotones = true;
    }
  }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    // Validacion fotos
    if (this.API_USER_AUTH.getEmpFoto() === null && this.API_USER_AUTH.getAlumFoto() === null){
      this.foto = '../../../../assets/no-foto.jpg';
    } else if(this.API_USER_AUTH.getEmpFoto() === null){
      this.foto = this.API_USER_AUTH.getAlumFoto();
    } else {
      this.foto = this.API_USER_AUTH.getEmpFoto();
    }
    // Validacion nombre usuario
    if (this.API_USER_AUTH.getEmpName() === null && this.API_USER_AUTH.getAlumName() === null){
      this.userName = this.API_USER_AUTH.getUserName(); //usuario por defecto
    } else if(this.API_USER_AUTH.getEmpName() === null){
      this.userName = this.API_USER_AUTH.getAlumName();
    } else {
      this.userName = this.API_USER_AUTH.getEmpName();
    }
  }

  realizarCambio(){
    if(this.contrasenia === true){ // OPT. 1
      if(this.contra.nueva === "" || this.contra.repetida === "" || this.contra.vieja === ""){
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Campo(s) Vacío(s).'
        });
      } else {
        if(this.contra.vieja === this.API_USER_AUTH.getPass()){
          if(this.contra.nueva.length >= 8){
            if(this.contra.nueva === this.contra.repetida){
              this.API_USER_AUTH.adminPerfil(this.API_USER_AUTH.getUserName(),1,{pass: this.contra.nueva}).subscribe(
                res => {
                  let JSONresponse = JSON.parse(JSON.stringify(res));
                  Swal.fire({
                    icon: 'success',
                    title: '¡Yeeei!',
                    text: JSONresponse.data
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // OK - Cerrar Sesión
                      localStorage.setItem('token','');
                      this.API_USER_AUTH.ShowNavigation.next(false);
                      this.router.navigate(['/login']);
                    }}
                  )
                },
                err => {
                  console.log("ERROR CAMBIAR CONTRASEÑA :( -> ",err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo salió mal!'
                  })
                }
              );
            } else {
              Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseñas no coinciden, Vuelve a escribirlas.',
                showConfirmButton: false,
                timer: 1500
              });
              this.contra.nueva = "";
              this.contra.repetida = "";
            }
          } else {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: 'La contraseña tiene que contener al menos 8 caracteres.',
              showConfirmButton: false,
              timer: 1500
            });
          }
        } else{
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña Actual Incorrecta.',
            showConfirmButton: false,
            timer: 1500
          });
          this.contra.vieja = "";
        }
      }
    } else if(this.perfil === true){ // OPT. 2
      if(this.photo.length === 0){
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Seleccione la nueva foto de perfil.'
        });
      } else {
        let tipoCambio: number;
        if(this.API_USER_AUTH.getIdRole() === 'prof'){
          tipoCambio = 2;
        } else if(this.API_USER_AUTH.getIdRole() === 'user'){
          tipoCambio = 3;
        }
        this.API_USER_AUTH.adminPerfil(this.API_USER_AUTH.getIdUsuario(),tipoCambio,{foto: this.photo}).subscribe(
          res => {
            let JSONresponse = JSON.parse(JSON.stringify(res));
            Swal.fire({
              icon: 'success',
              title: '¡Yeeei!',
              text: JSONresponse.data
            }).then((result) => {
              if (result.isConfirmed) {
                // OK - Cerrar Sesión
                localStorage.setItem('token','');
                this.API_USER_AUTH.ShowNavigation.next(false);
                this.router.navigate(['/login']);
              }}
            )
          },
          err => {
            console.log("ERROR CAMBIAR FOTO PERFIL :( -> ",err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo salió mal!'
            })
          }
        );
      }
      
    }
  }

  uploadPhoto (event: any){
    this.lookTextPhoto = true;
    this.lookSpinner = true;
    this.textDone[0] = "text-primary";
    this.textDone[1] = "SUBIENDO ...";
    const File = event.target.files[0];
    this.API_PHOTO.uploadPhotoToS3(File).subscribe(
      res => { 
        let JSONResponse = JSON.parse(JSON.stringify(res));
        this.photo = JSONResponse.data.Location
        this.lookSpinner = false;
        this.textDone[0] = "text-success";
        this.textDone[1] = "✅ EXITO";
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Foto subida con exito!',
          showConfirmButton: false,
          timer: 1000
        })
      },
      err => {
        this.lookSpinner = false;
        this.textDone[0] = "text-danger";
        this.textDone[1] = "❌ ERROR";
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: '¡Error al cargar imagen!',
          showConfirmButton: false,
          timer: 1000
        })
        console.log("ERROR SUBIR FOTO -> ",err)
      }
    );
  }
}
