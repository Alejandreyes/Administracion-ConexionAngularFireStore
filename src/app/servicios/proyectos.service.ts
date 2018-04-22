import { Injectable } from '@angular/core';
import { Proyecto } from '../modelos/proyecto.model';

import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProyectosService {
  proyectoSelecionado: Proyecto = new Proyecto();
  proyectosLista: AngularFireList<Proyecto>;
  constructor(private firebase: AngularFireDatabase,
    public router: Router) {
    this.proyectosLista = firebase.list('proyectos');
  }
  getProyectos() {
    return this.proyectosLista;
  }
  addProyecto(proyecto: Proyecto) {
    this.proyectosLista.push(proyecto).then((response) => {
      const key = response.key;
      proyecto.id = key;
      this.proyectosLista.set(key, proyecto);
    });
    this.router.navigate(['/usuarios']);

  }
  editProyecto(proyecto: Proyecto) {
    this.proyectosLista.set(proyecto.id, proyecto);
  }
  removeProyecto(proyecto: Proyecto) {
    this.proyectosLista.remove(proyecto.id);
  }
  /* getProyecto(nombre: string): Observable<Proyecto[]> {
    //let proyecto: Proyecto;
    let r: AngularFireList<Proyecto> = this.firebase.list('proyectos', ref => ref.orderByChild('nombre').equalTo(nombre));
    return r.valueChanges();
  } */
  getProyectoCampo(campo: string, criterio : string): Observable<Proyecto[]> {
    let r: AngularFireList<Proyecto> = this.firebase.list('proyectos', ref => ref.orderByChild(campo).equalTo(criterio));
    return r.valueChanges();
  }


}
