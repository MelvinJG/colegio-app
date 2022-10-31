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

}
