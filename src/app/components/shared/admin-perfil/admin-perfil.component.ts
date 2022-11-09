import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {

  constructor(private API_USER_AUTH: UserAuthService) { }

  public contrasenia: boolean = false;
  public perfil: boolean = false;
  foto: string = "";
  userName: string = "";
  verBotones: boolean = false;

  HabilitarContra() {
    this.contrasenia = true;
    this.perfil = false;
    this.verBotones = true;
  }

  HabilitarPerfil() {
    this.perfil = true;
    this.contrasenia = false;
    this.verBotones = true;
  }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    // Validacion fotos
    if (this.API_USER_AUTH.getEmpFoto() === null && this.API_USER_AUTH.getAlumFoto() === null){
      this.foto = '../../../../assets/no-foto.jpg';
    } else if(this.API_USER_AUTH.getEmpFoto() === null){
      this.foto = this.API_USER_AUTH.getAlumFoto();
    } else {
      this.foto = this.API_USER_AUTH.getEmpFoto();
    }
    // Validacion nombre usuario
    if (this.API_USER_AUTH.getEmpName() === null && this.API_USER_AUTH.getAlumName() === null){
      this.userName = this.API_USER_AUTH.getUserName(); //usuario por defecto
    } else if(this.API_USER_AUTH.getEmpName() === null){
      this.userName = this.API_USER_AUTH.getAlumName();
    } else {
      this.userName = this.API_USER_AUTH.getEmpName();
    }
  }

}
