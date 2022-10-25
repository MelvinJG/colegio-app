import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/userAuth/user-auth.service';

@Component({
  selector: 'app-calificar-tarea',
  templateUrl: './calificar-tarea.component.html',
  styleUrls: ['./calificar-tarea.component.css']
})
export class CalificarTareaComponent implements OnInit {

  constructor(private API_USER_AUTH: UserAuthService) { }

  public formulario:boolean = false;

  HabilitarFormulario(){
    this.formulario = true;
  }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
  }

}
