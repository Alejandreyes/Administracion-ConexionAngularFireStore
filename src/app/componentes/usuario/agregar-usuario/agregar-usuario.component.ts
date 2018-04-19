import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../modelos/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario.service';
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  constructor(private pf: FormBuilder,
    private usServ: UsuarioService,
    public router: Router) { }

  ngOnInit() {
    this.usuarioForm = this.pf.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      opcion: [''],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
    toast("Rellena todos los marcados en rojo", 2500);
  }

  onSubmit() {
    const usuario = new Usuario();
    usuario.nombre = this.usuarioForm.value.nombre;
    usuario.correo = this.usuarioForm.value.correo; 
    usuario.contrasenia = this.usuarioForm.value.contrasenia;
    usuario.rol = this.usuarioForm.value.opcion;
    this.usServ.addUsuario(usuario);
  }
  onCancel() {
    
    this.router.navigate(['/usuarios']);
  }
}
