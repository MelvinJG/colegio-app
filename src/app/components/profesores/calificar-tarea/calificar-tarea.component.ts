import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { AnuncioTareaService } from '../../../services/anuncio-tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificar-tarea',
  templateUrl: './calificar-tarea.component.html',
  styleUrls: ['./calificar-tarea.component.css']
})
export class CalificarTareaComponent implements OnInit {

  public formulario: boolean = false;
  tareas: any = [];

  no_Foto = '../../../../assets/no-foto.jpg';

  calificarTarea = {
    punteo: null,
    observacion: ''
  }

  constructor(private API_USER_AUTH: UserAuthService, private API_ANUNCIO_TAREA: AnuncioTareaService) { }

  HabilitarFormulario(){
    this.formulario = true;
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
