import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  
  aProduct: any = {
    "name": "",
    "category":"",
    "quantity": null,
    "minQuantity": null
  };

  public newProductForm = new FormGroup({
    name: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
    minQuantity: new FormControl('',Validators.required)
  })

  constructor(private database: DatabaseService,private auth: AuthServiceService) {}
  ngOnInit() {
    
    this.newProductForm.setValue({
      name: '',
      category:'',
      quantity: 0,
      minQuantity: 0,
    })
  }
  addNew(product){
    console.log(this.auth.getUid())
  }

}
