import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../../services/empleado.service';
import { UserAuthService } from '../../../../services/user-auth.service';

@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements OnInit {

  no_Foto = '../../../../assets/no-foto.jpg';
  empleados: any = []; // Contendra los alumnos que devuelva la API
  error: any; // Contendra el error que devuelva la API
  verError: boolean = false; // Pinta la vista error
  idGrado: any; // Contendra el parametro que recibimos
  nombreGrado: any; // Contendra el parametro que recibimos

  constructor(private API_SERVICE: EmpleadoService, private API_USER_AUTH: UserAuthService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    // Pintar los alumnos por grado
    this.API_SERVICE.getEmpleados().subscribe(
      res => {
        this.empleados = res;
      },
      err => {
        console.log("ERROR MAIN :( -> ",err);
        this.error = err;
        this.verError = true;
      }
    );
  }

}
