import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-notas-finales',
  templateUrl: './notas-finales.component.html',
  styleUrls: ['./notas-finales.component.css']
})
export class NotasFinalesComponent implements OnInit {

  constructor(private API_USER_AUTH: UserAuthService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
  }

}
