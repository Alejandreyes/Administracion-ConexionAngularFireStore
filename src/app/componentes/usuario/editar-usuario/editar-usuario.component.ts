import { Component, OnInit } from '@angular/core';

import {Usuario} from '../../../modelos/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario.service';
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  usuarioSelecionado : Usuario;
  usuarioForm: FormGroup;
  constructor(private pf: FormBuilder,
    private usServ: UsuarioService,
    public router: Router) { }

  ngOnInit() {
    this.usuarioForm = this.pf.group({
      nombre : ['', Validators.required],
      opcion : ['']
    });
    toast("Rellena todos los marcados en rojo", 2500);
    this.usuarioSelecionado = this.usServ.usuarioSelecionado;
    this.usuarioForm.controls['nombre'].patchValue(this.usuarioSelecionado.nombre);
    this.usuarioForm.controls['opcion'].setValue(this.usuarioSelecionado.rol); 
  }

  onSubmit(){
    //this.usServ.usuarioSelecionado = usuarioSelecionado; 
    const usuario = this.usServ.usuarioSelecionado;
    usuario.nombre = this.usuarioForm.value.nombre;
    usuario.rol = this.usuarioForm.value.opcion;
    this.usServ.editUsuario(usuario) ; 
    this.router.navigate(['/usuarios']);
  }
  onCancel(){
    this.router.navigate(['/usuarios']);
  }
}
