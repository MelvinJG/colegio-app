import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public Login() {
    console.log('Presiono LOGIN');
    this.router.navigate(['/Home']); // Redirecciona a la ruta que le indicamos (HOME)
  }
}
