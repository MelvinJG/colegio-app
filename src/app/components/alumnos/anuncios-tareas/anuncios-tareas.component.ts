import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-anuncios-tareas',
  templateUrl: './anuncios-tareas.component.html',
  styleUrls: ['./anuncios-tareas.component.css']
})
export class AnunciosTareasComponent implements OnInit {

  constructor(private API_USER_AUTH: UserAuthService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
  }

}
