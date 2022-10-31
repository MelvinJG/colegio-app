import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { AnuncioTareaService } from '../../../services/anuncio-tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosTareasComponent implements OnInit {

  anuncio: any = [];

  constructor(private API_USER_AUTH: UserAuthService, private API_ANUNCIO_TAREA: AnuncioTareaService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_ANUNCIO_TAREA.getAnunciosPorGrado(this.API_USER_AUTH.getIdUsuario()).subscribe(
      res => {
        this.anuncio = res;
      },
      err => {
        console.log("ERROR GET ANUNCIOS :( -> ",err);
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
