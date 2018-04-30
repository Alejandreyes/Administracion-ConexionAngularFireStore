import { Injectable } from '@angular/core';
import { Proyecto } from '../modelos/proyecto.model';

import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from './usuario.service';
import { LoginService } from './login.service';

@Injectable()
export class ProyectosService {

  
  proyectoSelecionado: Proyecto = new Proyecto();
  proyectosLista: AngularFireList<Proyecto>;
  constructor(private firebase: AngularFireDatabase,
    public logServ: LoginService,
    public router: Router) {
      let usu = logServ.usuarioLogueado ; 
      console.log(usu); 
      if(usu.rol == 'Administrador'){
        this.proyectosLista = firebase.list('proyectos');
      }else {
        this.iniciaLista(usu);   
      }    
  }
  iniciaLista(usu : Usuario): void {
    this.proyectosLista= this.firebase.list('usuario-proyectos', ref => ref.orderByChild('nombre').equalTo(usu.nombre));
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
    this.agregarUsuariosProyectos(usuariosSelecionados, proyecto.nombre);
    this.router.navigate(['/usuarios']);

  }
  editProyecto(proyecto: Proyecto, usuariosSelecionados: Usuario[]) {
    this.proyectosLista.set(proyecto.id, proyecto);
    this.editarUsuariosProyectos(usuariosSelecionados, proyecto.nombre);
    this.router.navigate(['/usuarios']);
  }
  removeProyecto(proyecto: Proyecto) {
    this.proyectosLista.remove(proyecto.id);
  }
  getProyectoCampo(campo: string, criterio: string): Observable<Proyecto[]> {
    let r: AngularFireList<Proyecto> = this.firebase.list('proyectos', ref => ref.orderByChild(campo).equalTo(criterio));
    return r.valueChanges();
  }
  agregarUsuariosProyectos(usuarios: Usuario[], nombre: string): void {
    let auxLista = this.firebase.list('usuarios-proyectos/' + nombre);
    usuarios.forEach(usuario => {
      auxLista.push({ nombre: usuario.nombre });
    });
  }
  editarUsuariosProyectos(usuarios: Usuario[], nombre: string): void {
    this.firebase.list('usuarios-proyectos').remove(nombre);
    let auxLista = this.firebase.list('usuarios-proyectos/' + nombre);
    usuarios.forEach(usuario => {
      auxLista.push({ nombre: usuario.nombre });
    });

    /* 
    
    ----------------------------------------
    CAMBIAR ANTES DE ALGO "auth != null"

    --------------------------------------------------
    
    
    
    */


  }
  
}
