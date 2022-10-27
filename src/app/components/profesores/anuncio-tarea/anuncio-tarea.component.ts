import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { AnuncioTareaService } from '../../../services/anuncio-tarea.service';
import Swal from 'sweetalert2';
import { AnuncioTarea } from '../../../models/AnuncioTarea';
import { InfoExtraService } from '../../../services/info-extra.service';

@Component({
  selector: 'app-anuncio-tarea',
  templateUrl: './anuncio-tarea.component.html',
  styleUrls: ['./anuncio-tarea.component.css']
})
export class AnuncioTareaComponent implements OnInit {

  public publicarTarea: boolean = false;
  public publicarAnuncio: boolean = false;
  anuncioTarea: any = [];
  grados: any = [];
  cursos: any = [];

  publicacion: AnuncioTarea = {
    tipo: '',
    titulo: '',
    grado_Id: 0,
    descripcion: '',
    curso_Id: null,
    punteo: null,
    dpi_Empleado: '',
    fecha_Vencimiento: null,
    calificado: '',
    fecha_Entrega: null,
    visibilidad_Publicacion: '',
  }

  constructor(private API_USER_AUTH: UserAuthService, private API_ANUNCIO_TAREA: AnuncioTareaService, private API_SERVICE: InfoExtraService) { }

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
    this.API_SERVICE.getGradosPROF(this.API_USER_AUTH.getIdUsuario()).subscribe(
      res => {
        this.grados = res;
      },
      err => {
        console.log("ERROR getGradosPROF :( -> ",err);
        if(err.status === 404){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Grados no encontrados.'
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
  }

  publicar(){
    this.publicacion.dpi_Empleado = this.API_USER_AUTH.getIdUsuario();
    this.API_ANUNCIO_TAREA.publicarTareaAnuncio(this.publicacion).subscribe(
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
        console.log("ERROR PUBLICAR ANUNCIO O TAREA :( -> ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
  }

  Anuncio(){
    this.publicacion.tipo = "ANUNCIO";
    this.publicar();
  }

  Tarea(){
    this.publicacion.tipo = "TAREA";
    this.publicacion.calificado = "NO";
    this.publicacion.visibilidad_Publicacion = "SI";
    this.publicar();
  }

  cursoSelect(event: any){
    this.publicacion.curso_Id = Number(event.target.value);
  }

  gradoSelect(event: any){
    this.publicacion.grado_Id = Number(event.target.value);
    this.API_SERVICE.getCursosPorGradoPROF(this.API_USER_AUTH.getIdUsuario(),event.target.value).subscribe(
      res => {
        this.cursos = res;
      },
      err => {
        console.log("ERROR getCursosPorGradoPROF :( -> ",err);
        if(err.status === 404){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Grados no encontrados.'
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
  }


}
