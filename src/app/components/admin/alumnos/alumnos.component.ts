import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumno.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { EmpleadoService } from '../../../services/empleado.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  no_Foto = '../../../../assets/no-foto.jpg';
  alumnos: any = []; // Contendra los alumnos que devuelva la API
  profesores: any = [];
  error: any; // Contendra el error que devuelva la API
  verError: boolean = false; // Pinta la vista error
  idGrado: any; // Contendra el parametro que recibimos
  nombreGrado: any; // Contendra el parametro que recibimos
  verInfoAlumnos: boolean = true;
  verInfoAlumnosProf: boolean = true;

  constructor(private activeRoute: ActivatedRoute, private API_SERVICE: AlumnoService, private API_USER_AUTH: UserAuthService, private API_EMPLEADO: EmpleadoService) { }

  ngOnInit(): void {
    // Validacion Roll para ver info de alumno
    if(this.API_USER_AUTH.getIdRole() === 'user'){
      this.verInfoAlumnos = false;
    } else if(this.API_USER_AUTH.getIdRole() === 'prof'){
      this.verInfoAlumnosProf = false;
    }
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.idGrado = this.activeRoute.snapshot.params['grado_Id'];
    this.nombreGrado = this.activeRoute.snapshot.params['nombre_Grado'];
    // Pintar los alumnos por grado
    this.API_SERVICE.getAlumnosPorGrado(this.idGrado).subscribe(
      res => {
        this.alumnos = res;
      },
      err => {
        console.log("ERROR MAIN ALUMNOS :( -> ",err);
        this.error = err;
        this.verError = true;
      }
    );
    // Pinta a los profesores por grado
    this.API_EMPLEADO.getProfesoresPorGrado(this.idGrado).subscribe(
      res => {
        this.profesores = res;
      },
      err => {
        console.log("ERROR MAIN PROFESORES :( -> ",err);
        if(err.status === 404){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: err.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!'
          })
        }
      }
    );
  }

}
