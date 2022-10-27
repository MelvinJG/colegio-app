import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { AnuncioTareaService } from '../../../services/anuncio-tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificar-tarea',
  templateUrl: './calificar-tarea.component.html',
  styleUrls: ['./calificar-tarea.component.css']
})
export class CalificarTareaComponent implements OnInit {

  public formulario:boolean = false;

  constructor(private API_USER_AUTH: UserAuthService, private API_ANUNCIO_TAREA: AnuncioTareaService) { }

  HabilitarFormulario(){
    this.formulario = true;
  }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
  }

}
