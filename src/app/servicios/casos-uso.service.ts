import { Injectable } from '@angular/core';
import { CasoUso } from '../modelos/casouso.model';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../modelos/usuario.model';
@Injectable()
export class CasosUsoService {
  
  nombreProyecto: string;
  casoSeleccionado: CasoUso = new CasoUso();
  casosLista: AngularFireList<CasoUso>;
  constructor(private firebase: AngularFireDatabase,
    public router: Router) {
  }
  getCasosUso(nombre: string) {

    this.casosLista = this.firebase.list('casos-uso/' + nombre);
    this.nombreProyecto = nombre;
    return this.casosLista;
  }
  addCasoUso(caso: CasoUso) {
    this.casosLista.push(caso).then((response) => {
      const key = response.key;
      caso.id = key;
      this.casosLista.set(key, caso);
    });;
    this.router.navigate(['/casosDeUso']);
  }
  /* 
  
  ----------------------------------------
  CAMBIAR ANTES DE ALGO "auth != null"

  --------------------------------------------------
  
  
  
  */
  editCasoUso(caso1: CasoUso) {
    this.casosLista.set(caso1.id, caso1);
  }

  delete(caso : CasoUso): void {
    this.casosLista.remove(caso.id);
  }

}
