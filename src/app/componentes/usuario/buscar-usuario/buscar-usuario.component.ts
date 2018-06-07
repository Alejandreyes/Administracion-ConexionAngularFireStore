import { Component, OnInit , EventEmitter} from '@angular/core';

import {MaterializeAction} from 'angular2-materialize';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Usuario } from '../../../modelos/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {
  selectOptions  = ["nombre","correo","rol"];
 
  busquedaForm : FormGroup; 
  usuarios : Usuario[];

  modalActions = new EventEmitter<string|MaterializeAction>();
  constructor(private pf: FormBuilder,
    private usuServ : UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.busquedaForm = this.pf.group({
      busqueda: ['', Validators.required],
      opcion: ['']
     
    });
  }
  onSubmit(){
    this.usuServ.getUsuarioCampos(this.busquedaForm.value.opcion, this.busquedaForm.value.busqueda).subscribe(items=>{
      this.usuarios = items;
    });
    
  }
  onEdit(usuario : Usuario){
    this.usuServ.usuarioSelecionado = usuario ; 
    this.router.navigate(['/editarUsuario']);
  }
  onDelete(){
    this.usuServ.removeUsuario(this.usuServ.usuarioSelecionado);
    this.usuServ.usuarioSelecionado=null;
  }
  openModal(usuario: Usuario) {
    this.usuServ.usuarioSelecionado = usuario ; 
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
