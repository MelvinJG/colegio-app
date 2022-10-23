import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input()
  SendError: any;
  mostrarErrMessage: boolean = false; // Para pintar mensaje de error o no
  
  constructor() { }

  order: string;
  ngOnInit(): void {
    if(this.SendError.status === 404) {
      this.mostrarErrMessage = true;
    }
    console.log("Recibimos -> ",this.SendError)
  }

}
