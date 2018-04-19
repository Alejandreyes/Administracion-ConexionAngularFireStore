import { Component } from '@angular/core';
import { LoginService } from './servicios/login.service';

import { Observable } from 'rxjs/Observable';
import { Usuario } from './modelos/usuario.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  usuarioLogueado$: Observable<Usuario>;
  usuarioLogueado: Usuario = new Usuario();
  constructor(public lgServ: LoginService) {
    
  }

  ngOnInit(){
    this.lgServ.getUsuarioLogueado$()
      .subscribe(usuarioLogueado => this.usuarioLogueado = usuarioLogueado);
  }
  refleja():void{
    console.log(this.usuarioLogueado); 
    console.log(this.lgServ.usuarioLogueado); 
  }
}
