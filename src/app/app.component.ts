import { Component } from '@angular/core';
import { LoginService } from './servicios/login.service';
import { Observable } from 'rxjs/Observable';
import { Usuario } from './modelos/usuario.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usuarioLogueado$: Observable<Usuario>;
  usuarioLogueado: Usuario = new Usuario();
  routeNames = ["usuarios", "proyectos", "accion"];
  constructor(public lgServ: LoginService) {

  }

  ngOnInit() {
    let subscripcion = this.lgServ.getusuarioObservable()
      .subscribe(usuarioL => {
        this.usuarioLogueado = usuarioL;
        //subscripcion.unsubscribe();
      });
  }
  logout() {
    this.lgServ.logout();
    this.usuarioLogueado$ = undefined;
    this.usuarioLogueado = new Usuario();
  }
}
