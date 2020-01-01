import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  productsList: Product[]
  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.database.getProductos().subscribe(
      response => {
        this.productsList = null
        this.productsList = response
      }
    )
  }

  sumarUno(item){
    this.database.updateProduct(item.id, {quantity: item.quantity + 1});
  }
  restarUno(item){
    this.database.updateProduct(item.id, {quantity: item.quantity - 1});
  }
}
