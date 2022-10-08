import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../../services/empleado/empleado.service';

@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements OnInit {

  no_Foto = '../../../../assets/no-foto.jpg';
  empleados: any = []; // Contendra los alumnos que devuelva la API
  error: any; // Contendra el error que devuelva la API
  mostrarErrMessage: boolean = false; // Para pintar mensaje de error o no
  idGrado: any; // Contendra el parametro que recibimos
  nombreGrado: any; // Contendra el parametro que recibimos

  constructor(private API_SERVICE: EmpleadoService) { }

  ngOnInit(): void {
    // Pintar los alumnos por grado
    this.API_SERVICE.getEmpleados().subscribe(
      res => {
        console.log(res);
        this.empleados = res;
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
