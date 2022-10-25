import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/userAuth/user-auth.service';

@Component({
  selector: 'app-anuncio-tarea',
  templateUrl: './anuncio-tarea.component.html',
  styleUrls: ['./anuncio-tarea.component.css']
})
export class AnuncioTareaComponent implements OnInit {

  constructor(private API_USER_AUTH: UserAuthService) { }

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
    this.API_USER_AUTH.ShowNavigation.next(true);
  }

}
