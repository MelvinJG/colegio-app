import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {

  constructor(private API_USER_AUTH: UserAuthService) { }

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
    this.API_USER_AUTH.ShowNavigation.next(true);
  }

}
