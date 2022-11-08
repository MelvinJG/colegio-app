import { Component, OnInit } from '@angular/core';
import { InfoExtraService } from 'src/app/services/info-extra.service';
import { UserAuthService } from '../../../services/user-auth.service';
import Swal from 'sweetalert2';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AnuncioTareaService } from 'src/app/services/anuncio-tarea.service';

@Component({
  selector: 'app-notas-finales',
  templateUrl: './notas-finales.component.html',
  styleUrls: ['./notas-finales.component.css']
})
export class NotasFinalesComponent implements OnInit {

  grados: any = [];
  alumnos: any = [];
  cursos: any = [];
  infoAlumno: any = [];
  bimestreSelect: string = "";
  alumnoSelect: string = "";
  verForm: boolean = false;
  no_Foto = '../../../../assets/no-foto.jpg';
  punteoFinal: any = [];
  notasYA: boolean = false;

  constructor(private API_USER_AUTH: UserAuthService, private API_SERVICE: InfoExtraService, private API_ALUMNO_SERVICE: AlumnoService, private API_ANUNCIO_TAREA: AnuncioTareaService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_SERVICE.getGradosPROF(this.API_USER_AUTH.getIdUsuario()).subscribe(
      res => {
        this.grados = res;
      },
      err => {
        console.log("ERROR getGradosPROF :( -> ",err);
        this.setError(err.status,'Grados no encontrados.');
      }
    );
  }

  SubirNotas(){
    let contador = 0;
    let objetos = {}
    for(let i = 0; i < this.punteoFinal.length ; i++){
      if((this.punteoFinal[i][0] === null || this.punteoFinal[i][0] === undefined) || (this.punteoFinal[i][1] === null || this.punteoFinal[i][1] === undefined)){
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Campo(s) Vacío(s).'
        })
        break;
      } else {
        contador++;
      }
      if(contador === this.punteoFinal.length){
        for(let i = 0; i < this.punteoFinal.length ; i++){
          objetos = Object.assign({cui_Alumno: this.infoAlumno.data.cui_Alumno},{curso_Id: this.cursos.data[i].curso_Id},{punteo_Zona: this.punteoFinal[i][0]}, {punteo_Examen: this.punteoFinal[i][1]},{punteo_Final: this.punteoFinal[i][2]}, {bimestre: Number(this.bimestreSelect)})
          this.API_ANUNCIO_TAREA.subirNotasFinales(objetos).subscribe(
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
              console.log("ERROR SUBIR NOTAS :( -> ",err);
              this.setError(err.status,'404. ???');
            }
          );
        }
      }
    }
  }

  getNotasFinales(){
    this.API_ANUNCIO_TAREA.validarNotasFinales(this.alumnoSelect,this.cursos.data[0].curso_Id,Number(this.bimestreSelect)).subscribe(
      res => {
        let JSONresponse = JSON.parse(JSON.stringify(res));
        if(JSONresponse.data.length === 1){
          Swal.fire({
            icon: 'success',
            title: '¡Yeeei!',
            text: 'Las notas para el alumno seleccionado en el bimestre seleccionado ya fueron subidas.',
            showConfirmButton: false,
            timer: 1200
          })
          this.notasYA = true;
        } else {
          this.notasYA = false;
        }
      },
      err => {
        console.log("ERROR validarNotasFinales :( -> ",err);
        this.setError(err.status,'404. ???');
      }
    );
  }

  BimestreSelect(event: any){
    this.bimestreSelect = event.target.value;
    if(this.bimestreSelect != "" && this.alumnoSelect != ""){
      this.verForm = true;
      this.getNotasFinales()
    }
  }

  punteoZona(event: any, index: number){
    this.punteoFinal[index][2] += Number(event.target.value);
  }

  punteoExamen(event: any, index: number){
    this.punteoFinal[index][2] += Number(event.target.value);
  }

  AlumnoSelect(event: any){
    this.alumnoSelect = event.target.value;
    this.API_ALUMNO_SERVICE.getAlumnoPorCUI(event.target.value).subscribe(
      res => {
        this.infoAlumno = res;
      },
      err => {
        console.log('ERROR CARGAR ALUMNOS POR GRADO :( -> ', err);
        this.setError(err.status,'Alumnos no encontrados, seleccione otro grado.');
      }
    );
    if(this.bimestreSelect != "" && this.alumnoSelect != ""){
      this.verForm = true;
      this.getNotasFinales()
    }
  }

  GradoSelect(event: any){
    this.punteoFinal = [];
    //Pintar alumnos
    this.API_ALUMNO_SERVICE.getAlumnosPorGrado(event.target.value).subscribe(
      res => {
        this.alumnos = res;
      },
      err => {
        console.log('ERROR CARGAR ALUMNOS POR GRADO :( -> ', err);
        this.setError(err.status,'Alumnos no encontrados, seleccione otro grado.');
      }
    );
    //Pintar CursosPorGrado
    this.API_SERVICE.getCursosPorGradoPROF(this.API_USER_AUTH.getIdUsuario(),event.target.value).subscribe(
      res => {
        this.cursos = res;
        for(let i = 0 ; i < this.cursos.data.length; i++){
          this.punteoFinal.push([]);
          this.punteoFinal[i][2] = 0;
        }
      },
      err => {
        console.log("ERROR getCursosPorGradoPROF :( -> ",err);
        this.setError(err.status,'Cursos no encontrados.');
      }
    );
  }

  setError(status: number, mensaje404: string){
    if(status === 404){
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: mensaje404
      })
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Algo salió mal!'
      })
    }
  }
}
