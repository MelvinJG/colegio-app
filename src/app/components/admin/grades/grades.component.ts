import { Component, OnInit } from '@angular/core';
import { InfoExtraService } from '../../../services/infoExtra/info-extra.service';
import { UserAuthService } from '../../../services/userAuth/user-auth.service';

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
  }
}
