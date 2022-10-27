import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  _unsubscribe: Subject<any>;

  constructor(private API_USER_AUTH: UserAuthService) { 
    this._unsubscribe = new Subject();
  }

  public isLogged: boolean = false;

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.pipe(takeUntil(this._unsubscribe)).subscribe(data => {
      if(data === true){  
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    })
  }

}
