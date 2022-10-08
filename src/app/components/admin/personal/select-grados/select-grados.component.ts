import { Component, OnInit } from '@angular/core';
import { InfoExtraService } from '../../../../services/infoExtra/info-extra.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-select-grados',
  templateUrl: './select-grados.component.html',
  styleUrls: ['./select-grados.component.scss']
})
export class SelectGradosComponent implements OnInit {

  constructor(private API_SERVICE: InfoExtraService) { }

  GradoYCursosInterseccion = [];
  grados: any = [];
  cursos: any = [];

  ngOnInit(): void {
    // Llenar el combo para seleccionar el grado
    this.API_SERVICE.getGrados().subscribe(
      res => {
        this.grados = res;
      },
      err => {
        console.log("ERROR CARGAR GRADOS :( -> ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
  }

  gradoSelect(event: any){
    // Pintar los cursos disponibles
    this.API_SERVICE.getCursosPorIDGrado(event.target.value).subscribe(
      res => {
        this.cursos = res;
      },
      err => {
        console.log("ERROR CARGAR CURSOS POR GRADO :( -> ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
  }

  add() {
    this.GradoYCursosInterseccion.push(this.GradoYCursosInterseccion.length);
  }

  asignacionGradosYCursos(){
    console.log("GradoYCursosInterseccion -> ",this.GradoYCursosInterseccion)
  }
}
