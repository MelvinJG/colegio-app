import { Component, OnInit } from '@angular/core';
import { AnuncioTareaService } from 'src/app/services/anuncio-tarea.service';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-ver-notas',
  templateUrl: './ver-notas.component.html',
  styleUrls: ['./ver-notas.component.css']
})
export class VerNotasComponent implements OnInit {

  foto: string = "";
  nombre = this.API_USER_AUTH.getAlumName();
  notasFinales: any = [];
  bimestreSelect: string = "";
  promedio: string = "";
  verNotas: boolean = false;
  anio: number = new Date().getFullYear();

  constructor(private API_USER_AUTH: UserAuthService, private API_ANUNCIO_TAREA: AnuncioTareaService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    // Validacion fotos
    if (this.API_USER_AUTH.getAlumFoto() === null){
      this.foto = '../../../../assets/no-foto.jpg';
    } else {
      this.foto = this.API_USER_AUTH.getAlumFoto();
    }
  }

  BimestreSelect(event: any){
    this.bimestreSelect = event.target.value;
    let sumaPunteosFinales: number = 0;
    this.API_ANUNCIO_TAREA.getNotasFinalesAlumno(this.API_USER_AUTH.getIdUsuario(),Number(this.bimestreSelect)).subscribe(
      res => {
        this.notasFinales = res;
        for(let i = 0; i < this.notasFinales.data.length; i++){
          sumaPunteosFinales += Number(this.notasFinales.data[i].punteo_Final)
        }
        this.promedio = (sumaPunteosFinales / this.notasFinales.data.length).toFixed(2);
        this.verNotas = true;
      },
      err => {
        console.log("ERROR getNotasFinalesAlumno :( -> ",err);
        if(err.status === 404){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Cursos No Encontrados.'
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
