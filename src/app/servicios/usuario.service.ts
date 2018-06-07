import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

// Bibliotecas de Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';

@Injectable()
export class UsuarioService {
  usuariosLista: AngularFireList<Usuario>;
  usuarioSelecionado: Usuario = new Usuario();
  constructor(private firebase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    public router: Router) {
    this.usuariosLista = firebase.list('usuarios');
  }

  getUsuarios() {
    return this.usuariosLista;
  }
  addUsuario(usuario: Usuario) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(usuario.correo, usuario.contrasenia).then(value => {
        this.usuariosLista.push(usuario).then((response) => {
          const key = response.key;
          usuario.id = key;
          this.usuariosLista.set(key, usuario);
        });
        this.router.navigate(['/usuarios']);
      })
      .catch(err => {
        toast("Error Correo ya se encuentra en uso ", 5000);
        toast("Intenta con otro", 5000);
      });

  }
  editUsuario(usuario: Usuario) {
    this.usuariosLista.set(usuario.id, usuario);
  }
  removeUsuario(usuario: Usuario) {
    this.usuariosLista.remove(usuario.id);
  }
  getUsuario(nombreUsuario: string) {
    //let usuario: Usuario;
    let r: AngularFireList<Usuario> = this.firebase.list('usuarios', ref => ref.orderByChild('nombre').startAt(nombreUsuario));
    return r;
  }
  getUsuarioCorreo(correo: string): Observable<Usuario[]> {
    let usuario: Usuario;
    let r: AngularFireList<Usuario> = this.firebase.list('usuarios', ref => ref.orderByChild('correo').equalTo(correo));
    return r.valueChanges();
  }
  getUsuarioCampos(campo: string, valor : string)  : Observable<Usuario[]> {
    let usuario: Usuario;
    if(campo == 'correo'){
      valor = valor.toLowerCase();
    }else{
      if(campo != 'id'){
        valor = valor.toUpperCase();
      }
      
    }
 
    let r: AngularFireList<Usuario> = this.firebase.list('usuarios', ref => ref.orderByChild(campo).startAt(valor).endAt(valor+'\uf8ff'));
    return r.valueChanges();
  }
  getUsuariosProyectos(nombre: string):AngularFireList<Usuario>{
    return this.firebase.list('usuarios-proyectos/'+nombre); 
  }
}
