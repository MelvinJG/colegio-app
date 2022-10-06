import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-grados',
  templateUrl: './select-grados.component.html',
  styleUrls: ['./select-grados.component.scss']
})
export class SelectGradosComponent implements OnInit {

  containers = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.containers.push(this.containers.length);
  }
}
