import { Component, OnInit } from '@angular/core';
import { InfoExtraService } from '../../../services/info-extra.service';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  grados: any = []; // Contendra los grados que devuelva la API
  error: any; // Contendra el error que devuelva la API
  verError: boolean = false; // Pinta la vista error

  constructor(private API_SERVICE: InfoExtraService, private API_USER_AUTH: UserAuthService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.getGrados();
  }

  getGrados(){
    if(this.API_USER_AUTH.getIdRole() === 'admin'){
      this.API_SERVICE.getGrados().subscribe(
        res => {
          this.grados = res;
        },
        err => {
          console.log("ERROR MAIN :( -> ",err);
          this.error = err;
          this.verError = true;
        }
      );
    } else if(this.API_USER_AUTH.getIdRole() === 'prof'){
      this.API_SERVICE.getGradosPROF(this.API_USER_AUTH.getIdUsuario()).subscribe(
        res => {
          this.grados = res;
        },
        err => {
          console.log("ERROR MAIN :( -> ",err);
          this.error = err;
          this.verError = true;
        }
      );
    } else if(this.API_USER_AUTH.getIdRole() === 'user'){
      this.API_SERVICE.getGradosALUM(this.API_USER_AUTH.getIdUsuario()).subscribe(
        res => {
          this.grados = res;
        },
        err => {
          console.log("ERROR MAIN :( -> ",err);
          this.error = err;
          this.verError = true;
        }
      );
    }
  }
}
