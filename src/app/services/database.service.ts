import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
  getProductos(uidCliente, queryCategory): Observable<Product[]> {
    return this.firestore.collection<Product>(`usuariosproductos/${uidCliente}/productos/`,
      ref => ref.where('category', '==', queryCategory))
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
      )
      );
  }
  deleteProduct(uidCliente: string, idProduct: string): Promise<void> {
    return this.firestore.doc<Product>(`/usuariosproductos/${uidCliente}/productos/${idProduct}`).delete();
  }
  addProduct(uidCliente: string, aProduct) {
    return this.firestore.collection(`/usuariosproductos/${uidCliente}/productos/`).add(aProduct);
  }
  updateProduct(uidCliente: string, id: string, data: Partial<Product>): Promise<void> {
    return this.firestore.doc<Product>(`/usuariosproductos/${uidCliente}/productos/${id}`).update(data);
  }
}
