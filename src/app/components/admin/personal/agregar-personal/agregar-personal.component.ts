import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoExtraService } from '../../../../services/infoExtra/info-extra.service';
import { EmpleadoService } from '../../../../services/empleado/empleado.service';

import Swal from 'sweetalert2'
// Interfaz
import { Empleado } from '../../../../models/Empleado';

@Component({
  selector: 'app-agregar-personal',
  templateUrl: './agregar-personal.component.html',
  styleUrls: ['./agregar-personal.component.css']
})
export class AgregarPersonalComponent implements OnInit {
  empleado: Empleado = {
    dpi_Empleado: null,
    nombre: null,
    no_Cel: null,
    correo: null,
    fecha_nac: new Date(),
    grados: [],
    direccion: null,
    puesto: null,
    salario: null,
    foto: null,
  }

  textDone: any = []; // Porcentaje de carga de la imagen
  lookTextPhoto: boolean = false; // Ver el TEXTO porcentaje de carga o no
  photoEmpleado: string; // Almacena URL foto del producto
  lookSpinner: boolean = false; // Ver la carga o no
  asignarGradosCursos: boolean = false;
  noDaraClases: boolean = false;
  SIDaraClases: boolean = false;
  mostrarBotones: boolean = false;
  gradosAsignados: any;

  constructor(private API_PHOTO: InfoExtraService, private API_EMPLEADO: EmpleadoService, private router: Router) { }

  uploadPhoto (event: any){
    this.lookTextPhoto = true;
    this.lookSpinner = true;
    this.textDone[0] = "text-primary";
    this.textDone[1] = "SUBIENDO ...";
    const File = event.target.files[0];
    this.API_PHOTO.uploadPhotoToS3(File).subscribe(
      res => { 
        let JSONResponse = JSON.parse(JSON.stringify(res));
        this.photoEmpleado = JSONResponse.data.Location
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

  agregarEmpleado(){
    let objetoFinal: any;
    if(this.noDaraClases){
      objetoFinal = Object.assign(this.empleado, {foto: this.photoEmpleado}, {grados: null}, {usuario_Registro: 'app_web_add'})
    } 
    if(this.SIDaraClases){
      objetoFinal = Object.assign(this.empleado, {foto: this.photoEmpleado}, {grados: this.gradosAsignados}, {usuario_Registro: 'app_web_add'})
    }
    this.API_EMPLEADO.addEmpleado(objetoFinal).subscribe(
      res => {
        let JSONresponse = JSON.parse(JSON.stringify(res));
        Swal.fire({
          icon: 'success',
          title: '¡Yeeei!',
          text: JSONresponse.data
        }).then((result) => {
          if (result.isConfirmed) {
            // OK Navegar listar Personal
            this.router.navigate(['/administracion/personal/listarPersonal']);
          }}
        )
      },
      err => {
        console.log("ERROR AGREGAR EMPLEADO -> ",err)
        if(err.error.code === 'REGISTRATION_DUPLICATE'){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'El empleado ya se encuentra registrado.'
          }).then((result) => {
            if (result.isConfirmed) {
              // OK
              // this.empleado = {} PENDIENTE DE HACER ALGO
            }}
          )
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!'
          })
        }
      }
    );
  }

  valueInputRadio(event: any){
    if(event.target.value === 'YES'){
      this.asignarGradosCursos = true;
      this.mostrarBotones = false;
    } else {
      this.asignarGradosCursos = false;
      this.noDaraClases = true;
      this.mostrarBotones = true;
    }
  }

  recibirDatos(e){
    this.gradosAsignados = e;
    this.mostrarBotones = true;
    this.SIDaraClases = true;
    this.noDaraClases = false;
  }

  ngOnInit(): void {
  }

}
