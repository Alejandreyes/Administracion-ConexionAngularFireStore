import { Component, OnInit, EventEmitter } from '@angular/core';

import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../servicios/usuario.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
//Bibliotecas de Diseño 
import { toast } from 'angular2-materialize';
import {MaterializeAction} from 'angular2-materialize';
  
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[];
  usuarioLogueado: Usuario;
  administrador : boolean ; 
  //...
  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal(usuario: Usuario) {
    this.usuarioSV.usuarioSelecionado = usuario ; 
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
  constructor(public usuarioSV: UsuarioService, 
    public lgServ: LoginService,
    public router: Router) {
    this.usuarioSV.getUsuarios().valueChanges().subscribe(items=> {
      this.usuarios = items;
    });

    this.usuarioLogueado = lgServ.usuarioLogueado;
    this.administrador = (this.usuarioLogueado.rol == "ADMINISTRADOR");

  }
  onCreate(){
    this.router.navigate(['/agregarUsuario']);
  }
  onEdit(usuario : Usuario){
    this.usuarioSV.usuarioSelecionado = usuario ; 
    this.router.navigate(['/editarUsuario']);
  }
  ngOnInit() {

  }
  onDelete(){
    
    this.usuarioSV.removeUsuario(this.usuarioSV.usuarioSelecionado);
    if(this.lgServ.usuarioLogueado.id == this.usuarioSV.usuarioSelecionado.id ){
      this.lgServ.logout();
    }
    this.usuarioSV.usuarioSelecionado=null;
  }

}
