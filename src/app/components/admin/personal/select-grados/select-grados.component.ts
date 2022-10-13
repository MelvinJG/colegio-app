import { Component, OnInit } from '@angular/core';
import { InfoExtraService } from '../../../../services/infoExtra/info-extra.service';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-grados',
  templateUrl: './select-grados.component.html',
  styleUrls: ['./select-grados.component.scss']
})
export class SelectGradosComponent implements OnInit {

  form: FormGroup;

  constructor(private API_SERVICE: InfoExtraService, fb: FormBuilder) {
    this.form = fb.group({
      cursosSelected:  new FormArray([])
    });
  }

  ArrayGradoYCursosInterseccion = [];
  grados: any = [];
  cursos: any[] = [];
  // cursos: any = [];
  GradosSeleccionados: number[] = [];
  CursosSeleccionados: number[] = [];
  cambioGrado: number;
  cambioCursos = {}
  isDisabled: boolean[] = [];
  agrego: boolean = true;
  finalizo: boolean = false;
  primeraVez: boolean = false;

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

  gradoSelect(event: any, container: number){
    this.cursos.splice(container);
    this.cambioGrado = event.target.value;
    // Pintar los cursos disponibles
    this.API_SERVICE.getCursosPorIDGrado(event.target.value).subscribe(
      res => {
        let cursosAPI = JSON.parse(JSON.stringify(res));
        this.cursos.push(cursosAPI.data)
        // this.cursos = res;
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

  cursoSelect(event: any){
    const cursosSelected = (this.form.controls['cursosSelected'] as FormArray);
    if (event.target.checked) {
      cursosSelected.push(new FormControl(event.target.value));
    } else {
      const index = cursosSelected.controls
      .findIndex(x => x.value === event.target.value);
      cursosSelected.removeAt(index);
    }
  }

  submit() {
    console.log(this.form.value);
    console.log("ARRAY CURSOS ", this.cursos)
  }

  add() {
    console.log(" ESTADO this.primeraVez -> ",this.primeraVez)
    this.agrego = false;
    // Validar que haya seleccionado un grado
    if(this.cambioGrado === null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No pude agregar otro grado, sin antes utilizar el que agrego.'
      })
    } else {
      // Es primera Vez que agrega
      if(this.primeraVez === true){
        // Validar si selecciono al menos un curso
        if(this.form.value.cursosSelected.length === 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No pude agregar otro grado, sin antes seleccionar los cursos.'
          })
        } else {
          // Metemos todos los valores de los grados seleccionados cada vez que agregamos
          this.GradosSeleccionados.push(this.cambioGrado);
          // Metemos todos los valores de los CURSOS seleccionados SEGUN EL GRADO cada vez que agregamos
          this.CursosSeleccionados.push(this.form.value.cursosSelected);
          // Agrega un nuevo valor FALSE porque no esta desabilitado al final
          this.isDisabled.push(false)
          // Agrega un elemento TRUE al principio del array para que se desabilite la asignacion previa
          this.isDisabled.unshift(true);
          // Seteamos grados null porque aun no selecciona niguno
          this.cambioGrado = null;
          // Seteamos CURSOS VACIOS porque aun no selecciona niguno
          //this.form.value.cursosSelected = [];
          this.form = new FormGroup({
            cursosSelected:  new FormArray([])
          });
          // Creamos un nuevo componente
          this.ArrayGradoYCursosInterseccion.push(this.ArrayGradoYCursosInterseccion.length);
        }
      } else {
        // Agrega un nuevo valor FALSE porque no esta desabilitado al final
        this.isDisabled.push(false)
        // Agrega un elemento TRUE al principio del array para que se desabilite la asignacion previa
        this.isDisabled.unshift(true);
        // Seteamos grados null porque aun no selecciona niguno
        this.cambioGrado = null;
        // Metemos los grados que se seleccionaron a un array
        // this.CursosSeleccionados.push(this.cambioGrado)
        // Creamos un nuevo componente
        this.ArrayGradoYCursosInterseccion.push(this.ArrayGradoYCursosInterseccion.length);
      }
    }
    this.primeraVez = true;
  }


  asignacionGradosYCursos(){
    // Validar que en la primera vez haya seleccionado algo
    if(this.cambioGrado === null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No pude finalizar el proceseo sin agregar ningun grado.'
      })
    } else {
      // Validar si selecciono al menos un curso
      if(this.form.value.cursosSelected.length === 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No pude finalizar el proceso sin antes seleccionar los cursos.'
        })
      } else { 
        // Bloqueamos los dos botones
        this.finalizo = true;
        this.agrego = true;
        console.log("Se asignara este grado y este curso")
        // Metemos el ultimo valor de los grados seleccionados (al finalizar)
        this.GradosSeleccionados.push(this.cambioGrado);
        // Metemos el ultimo valor de los CURSOS seleccionados SEGUN EL GRADO cada vez que agregamos
        this.CursosSeleccionados.push(this.form.value.cursosSelected);
        // Seteamos grados null porque aun no selecciona nigunov
        console.log("this.GradosSeleccionados -> ",this.GradosSeleccionados)
      }
    }
  }

  verCursos(){
    console.log("this.GradosSeleccionados -> ",this.GradosSeleccionados)
    console.log("this.CursosSeleccionados -> ",this.CursosSeleccionados)
    // console.log("this.GradosSeleccionados -> ",this.GradosSeleccionados)
    console.log("Cursos Seleccionados VALOR -> ",this.form.value.cursosSelected);
    console.log("Cursos Seleccionados TAMAÑO -> ",this.form.value.cursosSelected.length);
    // console.log("ARRAY CURSOS ", this.cursos)
  }
}
