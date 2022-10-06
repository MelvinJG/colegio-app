import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {

  constructor() { }

  public contrasenia:boolean = false;
  public perfil:boolean = false;

  HabilitarContra() {
    this.contrasenia = true;
    this.perfil = false;
  }

  HabilitarPerfil() {
    this.perfil = true;
    this.contrasenia = false;
  }

  ngOnInit(): void {
  }

}
