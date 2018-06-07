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
  //location ; 
  //isRoot; 
  usuarioForm: FormGroup;
  constructor(private pf: FormBuilder,
    private usServ: UsuarioService,
    public router: Router) { }

  ngOnInit() {
    this.usuarioForm = this.pf.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern( "^([a-zA-Z0-9]+)@([a-z]{4,10}).com$")]],
      opcion: [''],
      contrasenia: ['', [Validators.required,Validators.pattern( "^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9!@%#$&()`.+,]+){6,10}$")]]
    });
    toast("Rellena todos los marcados en rojo", 2500);
    window.history.replaceState({} , "","/usuarios") ;
    
  }

  onSubmit() {
    const usuario = new Usuario();
    usuario.nombre = (this.usuarioForm.value.nombre).toUpperCase();
    usuario.correo = this.usuarioForm.value.correo; 
    usuario.contrasenia = this.usuarioForm.value.contrasenia;
    usuario.rol = this.usuarioForm.value.opcion;
    usuario.proyectos = [] ; 
    this.usServ.addUsuario(usuario);
  }
  onCancel() {
    this.router.navigate(['/usuarios']);
  }
}
