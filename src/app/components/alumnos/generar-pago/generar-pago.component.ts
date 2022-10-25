import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/userAuth/user-auth.service';

@Component({
  selector: 'app-generar-pago',
  templateUrl: './generar-pago.component.html',
  styleUrls: ['./generar-pago.component.css']
})
export class GenerarPagoComponent implements OnInit {

  constructor(private API_USER_AUTH: UserAuthService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
  }

}
