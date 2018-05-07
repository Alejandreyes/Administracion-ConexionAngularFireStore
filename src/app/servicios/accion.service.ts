import { Injectable } from '@angular/core';

import {Accion} from '../modelos/accion.model';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AccionService {
  nombreProyecto : string ; 
  accionSeleccionado: Accion = new Accion();
  accionLista: AngularFireList<Accion>;
  constructor(private firebase: AngularFireDatabase,
    public router: Router) {
  }
  getAcciones(nombre: string) {
    this.accionLista = this.firebase.list('acciones');
    return this.accionLista;
  }
  addAccion(accion: Accion) {
    this.accionLista.push(accion).then((response) => {
      const key = response.key;
      accion.id = key;
      this.accionLista.set(key, accion);
    });;
    this.router.navigate(['/accion']);
  }
  editAccion(accion: Accion) {
    this.accionLista.set(accion.id,accion);
    this.router.navigate(['/accion']);
  }
  delete(accion : Accion): void {
    this.accionLista.remove(accion.id);
  }
}
