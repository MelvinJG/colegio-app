import { Component, OnInit } from '@angular/core';
import { InfoExtraService } from 'src/app/services/info-extra.service';
import { UserAuthService } from '../../../services/user-auth.service';
import Swal from 'sweetalert2';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-notas-finales',
  templateUrl: './notas-finales.component.html',
  styleUrls: ['./notas-finales.component.css']
})
export class NotasFinalesComponent implements OnInit {

  grados: any = [];
  alumnos: any = [];
  infoAlumno: any = [];
  bimestreSelect: string = "";
  alumnoSelect: string = "";
  verForm: boolean = false;
  no_Foto = '../../../../assets/no-foto.jpg';

  constructor(private API_USER_AUTH: UserAuthService, private API_SERVICE: InfoExtraService, private API_ALUMNO_SERVICE: AlumnoService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_SERVICE.getGradosPROF(this.API_USER_AUTH.getIdUsuario()).subscribe(
      res => {
        this.grados = res;
      },
      err => {
        console.log("ERROR getGradosPROF :( -> ",err);
        this.setError(err.status,'Grados no encontrados.');
      }
    );
  }

  BimestreSelect(event: any){
    this.bimestreSelect = event.target.value;
    if(this.bimestreSelect != "" && this.alumnoSelect != ""){
      this.verForm = true;
    }
  }

  AlumnoSelect(event: any){
    this.alumnoSelect = event.target.value;
    this.API_ALUMNO_SERVICE.getAlumnoPorCUI(event.target.value).subscribe(
      res => {
        this.infoAlumno = res;
      },
      err => {
        console.log('ERROR CARGAR ALUMNOS POR GRADO :( -> ', err);
        this.setError(err.status,'Alumnos no encontrados, seleccione otro grado.');
      }
    );
    if(this.bimestreSelect != "" && this.alumnoSelect != ""){
      this.verForm = true;
    }
  }

  GradoSelect(event: any){
    this.API_ALUMNO_SERVICE.getAlumnosPorGrado(event.target.value).subscribe(
      res => {
        this.alumnos = res;
      },
      err => {
        console.log('ERROR CARGAR ALUMNOS POR GRADO :( -> ', err);
        this.setError(err.status,'Alumnos no encontrados, seleccione otro grado.');
      }
    );
  }

  setError(status: number, mensaje404: string){
    if(status === 404){
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: mensaje404
      })
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Algo salió mal!'
      })
    }
  }
}
