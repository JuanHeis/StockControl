import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {
  productsList: Product[]
  constructor(private database: DatabaseService,private auth:AuthServiceService, private afAuth: AngularFireAuth) { }

  ngOnInit() {


    this.afAuth.authState.subscribe( user => {
      if (user) {  
        this.database.getProductos(user.uid).subscribe(
          response => {
            this.productsList = null
            this.productsList = response
          }
        )
      }
    });
  }

  sumarUno(item){
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.database.updateProduct(user.uid, item.id, {quantity: item.quantity + 1})
        return true
      } else return false
    })
  }
  restarUno(item){
    this.afAuth.authState.subscribe( user => {
      if (user) {  
        this.database.updateProduct(user.uid, item.id, {quantity: item.quantity - 1})
        return true
      } else return false
    })
  }
}
