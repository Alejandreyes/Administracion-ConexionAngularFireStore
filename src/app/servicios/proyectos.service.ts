import { Injectable } from '@angular/core';
import { Proyecto } from '../modelos/proyecto.model';

import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from './usuario.service';

@Injectable()
export class ProyectosService {
  proyectoSelecionado: Proyecto = new Proyecto();
  proyectosLista: AngularFireList<Proyecto>;
  constructor(private firebase: AngularFireDatabase,
    private usuServ: UsuarioService,    
    public router: Router) {
    this.proyectosLista = this.firebase.list('proyectos');
  }

  getProyectos() {
    return this.proyectosLista;
  }
  addProyecto(proyecto: Proyecto, usuariosSelecionados: Usuario[]) {
    this.proyectosLista.push(proyecto).then((response) => {
      const key = response.key;
      proyecto.id = key;
      this.proyectosLista.set(key, proyecto);
    });
    this.agregarUsuariosProyectos(usuariosSelecionados, [], proyecto.id);
    this.proyectoSelecionado = new Proyecto();
    this.router.navigate(['/usuarios']);

  }
  editProyecto(proyecto: Proyecto, usuariosSelecionados: Usuario[], usuariosDiff: Usuario[]) {
    if (proyecto.usuarios == null || proyecto.usuarios == undefined) {
      proyecto.usuarios = [];
    }
    this.proyectosLista.set(proyecto.id, proyecto);
    this.editarUsuariosProyectos(usuariosSelecionados, usuariosDiff, proyecto.id);
    this.router.navigate(['/usuarios']);
  }
  removeProyecto(proyecto: Proyecto) {
    this.proyectosLista.remove(proyecto.id);
  }
  getProyectoCampo(campo: string, criterio: string): Observable<Proyecto[]> {
    let r: AngularFireList<Proyecto> = this.firebase.list('proyectos', ref => ref.orderByChild(campo).equalTo(criterio));
    return r.valueChanges();
  }
  agregarUsuariosProyectos(usuariosSelecionados: Usuario[], usuariosDiff: Usuario[], id: string): void {
    usuariosSelecionados.forEach(usuario => {
      let aux = this.usuServ.getUsuarioCampos('id', usuario.id);
      aux.subscribe(item => {
        let usuarioEle = item[0];
        if (usuarioEle.proyectos == undefined) {
          usuarioEle.proyectos = [];
        }
        if (usuarioEle.proyectos.indexOf(id) < 0) {
          usuarioEle.proyectos.push(id);
        }
        this.usuServ.editUsuario(usuarioEle);
      });
    });

  }
  eliminarUsuarioProyecto(usuariosSelecionados: Usuario[], usuariosDiff: Usuario[], id: string): void {
    usuariosDiff.forEach(usuario => {
      let aux = this.usuServ.getUsuarioCampos('id', usuario.id);
      aux.subscribe(item => {
        let usuarioEle = item[0];
        if (!usuariosSelecionados.includes(usuarioEle)) {
          if (usuarioEle.proyectos == undefined) {
            usuarioEle.proyectos = [];
          }
          let proyectosUsuario = usuarioEle.proyectos.filter(item => {
            usuariosDiff.forEach(usuarioAux => {
              if (usuarioAux.id == item) {
                return true;
              }
            });
          });
          usuarioEle.proyectos = proyectosUsuario;
          this.usuServ.editUsuario(usuarioEle);
        }
      });
    });
  }
  editarUsuariosProyectos(usuariosSelecionados: Usuario[], usuariosDiff: Usuario[], id: string): void {
    usuariosSelecionados.forEach(usuario => {
      let aux = this.usuServ.getUsuarioCampos('id', usuario.id);
      let flag = false;
      let sub = aux.subscribe(item => {
        let usuarioEle = item[0];
        let proyectos = [];
        if (!usuariosDiff.includes(usuarioEle)) {
          if (usuarioEle.proyectos != undefined) {
            proyectos = usuarioEle.proyectos;
          }
          if (proyectos.indexOf(id) < 0) {
            proyectos.push(id);
          }
          usuario.proyectos = proyectos;
          this.firebase.list('usuarios').set(usuario.id, usuario)
            .then(value => {
              sub.unsubscribe();
            })
            .catch(err => {

            });
        }
      });
    });
    usuariosDiff.forEach(usuario => {
      let aux = this.usuServ.getUsuarioCampos('id', usuario.id);
      let sub = aux.subscribe(item => {
        let usuarioEle = item[0];
        if (usuarioEle.proyectos == undefined) {
          usuarioEle.proyectos = [];
        }
        let proyectosUsuario = usuarioEle.proyectos.filter(item => {
          return item!=id; 
        });
        usuarioEle.proyectos = proyectosUsuario;
        this.usuServ.editUsuario(usuarioEle);
        this.firebase.list('usuarios').set(usuarioEle.id, usuarioEle)
          .then(value => {
            sub.unsubscribe();
          })
          .catch(err => {
            console.log("FALLO");
          });
      });
    });
  }

}
