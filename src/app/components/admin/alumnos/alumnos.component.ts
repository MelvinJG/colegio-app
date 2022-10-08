import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumno/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  no_Foto = '../../../../assets/no-foto.jpg';
  alumnos: any = []; // Contendra los alumnos que devuelva la API
  error: any; // Contendra el error que devuelva la API
  mostrarErrMessage: boolean = false; // Para pintar mensaje de error o no
  idGrado: any; // Contendra el parametro que recibimos
  nombreGrado: any; // Contendra el parametro que recibimos

  constructor(private activeRoute: ActivatedRoute, private API_SERVICE: AlumnoService) { }

  ngOnInit(): void {
    this.idGrado = this.activeRoute.snapshot.params['grado_Id'];
    this.nombreGrado = this.activeRoute.snapshot.params['nombre_Grado'];
    // Pintar los alumnos por grado
    this.API_SERVICE.getAlumnosPorGrado(this.idGrado).subscribe(
      res => {
        this.alumnos = res;
      },
      err => {
        console.log("ERROR MAIN :( -> ",err);
        if(err.status === 404) {
          this.mostrarErrMessage = true;
        }
        this.error = err;
        // melvin = "ESTO ES UNA PRUEBA"
        // this.router.navigate(['shared/error',this.error]);
      }
    );
  }

}
