import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  _unsubscribe: Subject<any>;

  constructor(private API_USER_AUTH: UserAuthService, private router: Router, private API_PAGO_SERVICE: PagoService) { 
    this._unsubscribe = new Subject();
  }

  public isLoggedDentroSistema: boolean = false;
  public isLoggedAdministracion: boolean = false;
  public isLoggedProfesores: boolean = false;
  public isLoggedAlumnos: boolean = false;
  count: any;
  userName: string = "";
  foto: string = "";
  logo: string = "";
  
  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.pipe(takeUntil(this._unsubscribe)).subscribe(data => {
      if(data === true){  
        this.isLoggedDentroSistema = true;
        this.logo = '../../../../assets/logoDummy.jpeg';
        // Validacion fotos
        if (this.API_USER_AUTH.getEmpFoto() === null && this.API_USER_AUTH.getAlumFoto() === null){
          this.foto = '../../../../assets/no-foto.jpg';
        } else if(this.API_USER_AUTH.getEmpFoto() === null){
          this.foto = this.API_USER_AUTH.getAlumFoto();
        } else {
          this.foto = this.API_USER_AUTH.getEmpFoto();
        }
        // Validacion roll usuarios
        if(this.API_USER_AUTH.getIdRole() === 'admin'){
          this.isLoggedAdministracion = true;
          this.API_PAGO_SERVICE.countAllPagosApp().subscribe(
            (res: any) => {
              this.count = res.data.conteo;
            },
            (err) => {
              console.log("ERROR countAllPagosApp :( -> ",err);
            }
          );
        } else if(this.API_USER_AUTH.getIdRole() === 'prof'){
          this.isLoggedProfesores = true;
        } else if(this.API_USER_AUTH.getIdRole() === 'user'){
          this.isLoggedAlumnos = true;
        }
        // Validacion nombre usuario
        if (this.API_USER_AUTH.getEmpName() === null && this.API_USER_AUTH.getAlumName() === null){
          this.userName = this.API_USER_AUTH.getUserName(); //usuario por defecto
        } else if(this.API_USER_AUTH.getEmpName() === null){
          this.userName = this.API_USER_AUTH.getAlumName();
        } else {
          this.userName = this.API_USER_AUTH.getEmpName();
        }
      } else {
        this.isLoggedDentroSistema = false;
        this.isLoggedAdministracion = false;
        this.isLoggedProfesores = false;
        this.isLoggedAlumnos = false;
      }
    })
  }

  logout(){
    localStorage.setItem('token','');
    this.API_USER_AUTH.ShowNavigation.next(false);
    this.router.navigate(['/login']);
    Swal.fire({
      icon: 'success',
      title: 'Good Bye!',
      showConfirmButton: false,
      timer: 1200
    });
  }
}
