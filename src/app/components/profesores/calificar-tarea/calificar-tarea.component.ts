import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { AnuncioTareaService } from '../../../services/anuncio-tarea.service';
import Swal from 'sweetalert2';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-calificar-tarea',
  templateUrl: './calificar-tarea.component.html',
  styleUrls: ['./calificar-tarea.component.css']
})
export class CalificarTareaComponent implements OnInit {

  public formulario: boolean = false;
  tareas: any = [];

  no_Foto = '../../../../assets/no-foto.jpg';
  tareaCalificar: string = "";
  gradoTareaCalificar: string = "";
  alumnos: any = [];
  tareaID: number = 0;
  calificarTarea: any = [];

  constructor(private API_USER_AUTH: UserAuthService, private API_ANUNCIO_TAREA: AnuncioTareaService, private API_ALUMNO: AlumnoService) { }

  SubirCalificacionTarea(){
    let objetos = {}
    for(let i = 0; i < this.calificarTarea.length ; i++){
      objetos = Object.assign({anuncio_Tarea_Id: this.tareaID}, {cui_Alumno: this.alumnos.data[i].cui_Alumno},{punteo_Tarea: this.calificarTarea[i][0]}, {observacion: this.calificarTarea[i][1]})
      console.log("objetoFinal -> ",objetos)
      this.API_ANUNCIO_TAREA.calificarTarea(objetos).subscribe(
        res => {
          let JSONresponse = JSON.parse(JSON.stringify(res));
          Swal.fire({
            icon: 'success',
            title: '¡Yeeei!',
            text: JSONresponse.data
          }).then((result) => {
            if (result.isConfirmed) {
              // OK
              window.location.reload();
            }}
          )
        },
        err => {
          console.log("ERROR CALIFICAR TAREA :( -> ",err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!'
          })
        }
      );
    }
  }

  CalificarTarea(tareaID: number, tituloTarea: string, grado: string, gradoID: string){
    this.calificarTarea = [];
    this.formulario = true;
    this.tareaID = tareaID;
    this.tareaCalificar = tituloTarea;
    this.gradoTareaCalificar = grado;

    this.API_ALUMNO.getAlumnosPorGrado(gradoID).subscribe(
      res => {
        this.alumnos = res;
        console.log(this.alumnos.data)
        for(let i = 0 ; i < this.alumnos.data.length; i++){
          this.calificarTarea.push([]);
        }
      },
      err => {
        console.log("ERROR GET ALUMNOS :( -> ",err);
        if(err.status === 404){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Ningun alumno encontrado.'
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
    // console.log("TAREA ID ",tareaID)
    // console.log("GRADO ID ",gradoID)
  }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_ANUNCIO_TAREA.getTareas(this.API_USER_AUTH.getIdUsuario()).subscribe(
      res => {
        this.tareas = res;
      },
      err => {
        console.log("ERROR GET TAREAS :( -> ",err);
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
