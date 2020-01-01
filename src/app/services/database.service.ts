import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) { }

  /**
   * Obtiene todos los productos traidos de firestore
   */
  getProductos(): Observable<Product[]> {
    return this.firestore.collection<Product>('productos')
    .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
    })
    );
  }
  updateProduct(id:string, data: Partial<Product>): Promise<void>{
    return this.firestore.doc<Product>(`/productos/${id}`).update(data);
  }
}
