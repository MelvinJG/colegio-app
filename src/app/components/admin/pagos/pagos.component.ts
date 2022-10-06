import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  titulo: string = "";
  monto: number = 0;
  esSalario: boolean = false;

  ngOnInit(): void {

    const parametro = this.activeRoute.snapshot.params;

    if(parametro['id'] === 'pago-primaria') {
      this.titulo = "Pago Colegiatura Nivel Primaria";
      this.monto = 350;
    } 
    else if(parametro['id'] === 'pago-basicos') {
      this.titulo = "Pago Colegiatura Nivel Basico";
      this.monto = 400;
    }
    else if(parametro['id'] === 'pago-inscripcion') {
      this.titulo = "Pago Inscripcion";
      this.monto = 300;
    }
    else {
      this.titulo = "Pago Salarial";
      this.monto = 0; //Se obtendra en base de datos
      this.esSalario = true;
    }
  }

}
