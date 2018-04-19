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
    /* Cargamos la vista de todos los usuarios 
     * lo primero que se debe hacer es cargar el objeto AngularFireList<Usuario> que es conseguido en 
     * El servicio de usuario 
     * Despues una captura instantanea en el momento de los datos Esto se debe hacer porque Firebase es una base de datos en tiempo real
     * el metodo subscribe sirve para agregar un observador para capturar el momento en el que los datos se modifiquen
     *  
     *  
     */
    this.usuarioSV.getUsuarios().valueChanges().subscribe(items=> {
      this.usuarios = items;
    });

    this.usuarioLogueado = lgServ.usuarioLogueado;

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
    this.usuarioSV.usuarioSelecionado=null;
  }

}
