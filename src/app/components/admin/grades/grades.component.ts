import { Component, OnInit } from '@angular/core';
import { InfoExtraService } from '../../../services/infoExtra/info-extra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  grados: any = []; // Contendra los grados que devuelva la API
  error: any; // Contendra el error que devuelva la API
  mostrarErrMessage: boolean = false; // Para pintar mensaje de error o no

  constructor(private API_SERVICE: InfoExtraService, private router: Router) { }

  ngOnInit(): void {
    this.getGrados();
  }

  getGrados(){
    this.API_SERVICE.getGrados().subscribe(
      res => {
        this.grados = res;
      },
      err => {
        console.log("ERROR MAIN :( -> ",err);
        if(err.status === 404) {
          this.mostrarErrMessage = true;
        }
        this.error = err;
        // melvin = "ESTO ES UNA PRUEBA"
        // this.router.navigate(['shared/error',this.error]);
      }
    );
  }
}
