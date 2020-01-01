import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  aProduct: any = {
    "name": "",
    "category":"",
    "quantity": 0,
    "minQuantity": 0
  };
  constructor() { }

  ngOnInit() {
    
  }

}
