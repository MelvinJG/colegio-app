import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anuncio-tarea',
  templateUrl: './anuncio-tarea.component.html',
  styleUrls: ['./anuncio-tarea.component.css']
})
export class AnuncioTareaComponent implements OnInit {

  constructor() { }

  public publicarTarea: boolean = false;
  public publicarAnuncio: boolean = false;

  PublicarTarea(){
    this.publicarAnuncio = false;
    this.publicarTarea = true;
  }

  PublicarAnuncio(){
    this.publicarTarea = false;
    this.publicarAnuncio = true;
  }

  ngOnInit(): void {
  }

}
