import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { AnuncioTareaService } from '../../../services/anuncio-tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: any = [];

  constructor(private API_USER_AUTH: UserAuthService, private API_ANUNCIO_TAREA: AnuncioTareaService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_ANUNCIO_TAREA.getTareasPorGrado(this.API_USER_AUTH.getIdUsuario()).subscribe(
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

  getPunteoTareaEspecifica(tareaID){
    this.API_ANUNCIO_TAREA.getPunteoTarea(tareaID,this.API_USER_AUTH.getIdUsuario()).subscribe(
      res => {
        let JSONresponse = JSON.parse(JSON.stringify(res));
        console.log(JSONresponse.data)
        Swal.fire({
          icon: 'success',
          title: 'Resultados de la Tarea.',
          html: `
            <b>Punteo:</b> ${JSONresponse.data.punteo_Tarea} / ${JSONresponse.data.punteo} pts. </br>
            <b>Observaciones:</b> ${JSONresponse.data.observacion}
          `
        });
      },
      err => {
        if(err.status === 404){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: err.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          console.log("ERROR GET PUNTEO TAREA :( -> ",err);
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
