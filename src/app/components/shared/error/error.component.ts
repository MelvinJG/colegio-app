import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,) { }

  order: string;
  ngOnInit(): void {
    // console.log("PARAMETRO -> ", this.activeRoute.snapshot.params.err)
    // console.log("PARAMETRO -> ", JSON.stringify(this.activeRoute.snapshot.params.err))
  }

}
