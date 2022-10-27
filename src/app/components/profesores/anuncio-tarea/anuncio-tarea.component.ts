import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { AnuncioTareaService } from '../../../services/anuncio-tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anuncio-tarea',
  templateUrl: './anuncio-tarea.component.html',
  styleUrls: ['./anuncio-tarea.component.css']
})
export class AnuncioTareaComponent implements OnInit {

  public publicarTarea: boolean = false;
  public publicarAnuncio: boolean = false;
  anuncioTarea: any = [];

  constructor(private API_USER_AUTH: UserAuthService, private API_ANUNCIO_TAREA: AnuncioTareaService) { }

  PublicarTarea(){
    this.publicarAnuncio = false;
    this.publicarTarea = true;
  }

  PublicarAnuncio(){
    this.publicarTarea = false;
    this.publicarAnuncio = true;
  }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_ANUNCIO_TAREA.getTareaAnuncio(this.API_USER_AUTH.getIdUsuario()).subscribe(
      res => {
        this.anuncioTarea = res;
      },
      err => {
        console.log("ERROR GET ANUNCIO Y TAREA :( -> ",err);
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
