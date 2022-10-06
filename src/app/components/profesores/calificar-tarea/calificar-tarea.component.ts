import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificar-tarea',
  templateUrl: './calificar-tarea.component.html',
  styleUrls: ['./calificar-tarea.component.css']
})
export class CalificarTareaComponent implements OnInit {

  constructor() { }

  public formulario:boolean = false;

  HabilitarFormulario(){
    this.formulario = true;
  }

  ngOnInit(): void {
  }

}
