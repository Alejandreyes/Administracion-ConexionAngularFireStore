import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from '../servicios/usuario.service';
//Bibliotecas de direccionamiento de angular
import { CanActivate ,Router,RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
//Bibliotecas de Diseño 
import { toast } from 'angular2-materialize';

// Bibliotecas de Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// Agregando programacion reactiva
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
@Injectable()
export class LoginService implements CanActivate{
  
  usuarioLogueado: Usuario ;
  usuarioLogueado$ = new Subject<Usuario>();
  //usuarioL :Observable<Usuario> ;
  user: Observable<firebase.User>; // Usuario propio de firebase 
  
  
  constructor(private firebaseAuth: AngularFireAuth,
    private usrServ: UsuarioService,
    public router: Router) {
    this.user = firebaseAuth.authState;
  }
  signin(usuario: Usuario) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(usuario.correo, usuario.contrasenia)
      .then(value => {
        this.usrServ.getUsuarioCorreo(usuario.correo)
          .subscribe(item => {
            if (item.length > 0) {
              let usuarioAut = item[0]; // Obtengo el usuario con el nombre de usuario 
              this.usuarioLogueado = usuarioAut;
              this.usuarioLogueado$.next(this.usuarioLogueado);
              this.router.navigate(['/usuarios']);
            }
          });

        //
      })
      .catch(err => {
         toast("Usuario o contraseña invalidos" , 2000); 
         toast("Intenta otra vez", 1000 );
      });
  }


  getUsuarioLogueado$(): Observable<Usuario> {
    return this.usuarioLogueado$.asObservable();
  }
  logout(){
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.usuarioLogueado != null ; 
  }
}
