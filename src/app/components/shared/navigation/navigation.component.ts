import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  public isLoggedDentroSistema: boolean = true;
  public isLoggedAdministracion: boolean = true;
  public isLoggedProfesores: boolean = false;
  public isLoggedAlumnos: boolean = false;
  
  ngOnInit(): void {
  }

}
