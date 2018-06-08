import { Component, OnInit } from '@angular/core';

import {Usuario} from '../../../modelos/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario.service';
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';
import { LoginService } from '../../../servicios/login.service';

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
    private lgServ :LoginService,
    public router: Router) { }

  ngOnInit() {
    this.usuarioForm = this.pf.group({
      nombre : ['', Validators.required],
      opcion : ['']
    });
    window.history.replaceState({} , "","/usuarios") ;
    toast("Rellena todos los marcados en rojo", 2500);
    this.usuarioSelecionado = this.usServ.usuarioSelecionado;
    this.usuarioForm.controls['nombre'].patchValue(this.usuarioSelecionado.nombre);
    this.usuarioForm.controls['opcion'].setValue(this.usuarioSelecionado.rol); 
  }

  onSubmit(){
    const usuario = this.usServ.usuarioSelecionado;
    usuario.nombre = this.usuarioForm.value.nombre.toUpperCase();
    usuario.rol = this.usuarioForm.value.opcion;
    console.log(usuario.nombre);
    console.log(this.lgServ.usuarioLogueado.nombre); 
    if(usuario.nombre == this.lgServ.usuarioLogueado.nombre){
      this.lgServ.usuarioLogueado = usuario ;
    }
    this.usServ.editUsuario(usuario) ; 
    this.router.navigate(['/usuarios']);
  }
  onCancel(){
    this.usServ.usuarioSelecionado = new Usuario(); 
    this.router.navigate(['/usuarios']);
  }
}
