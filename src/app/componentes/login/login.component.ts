// Bibliotecas de angular
import { Component, OnInit } from '@angular/core';
// Bibliotecas para manejar formularios en angular 
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

// ----------------------------------------------
//Bibliotecas de Diseño 
import { toast } from 'angular2-materialize';
import { LoginService } from '../../servicios/login.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
  * Falta en el constructor una instancia del servicio que pueda manejar la base de datos del tipo de objeto 
  */
  usuarioForm: FormGroup;

  constructor(private pf: FormBuilder,
    private usServ: UsuarioService,
    public loginServ: LoginService) { }

  ngOnInit() {
    window.history.replaceState({} , "","/usuarios") ;
    this.usuarioForm = this.pf.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
    toast("Rellena todos los marcados en rojo", 2500);
  }
  onSubmit() {
    const usuarioPrueba = {
      correo: this.usuarioForm.get('correo').value,
      contrasenia: this.usuarioForm.get('contrasenia').value
    };
    if (this.usuarioForm.controls.correo.invalid || this.usuarioForm.controls.contrasenia.invalid) {
      toast("Revisa que sean correctos todos los campos", 1500);
    } else {
      let usuario: Usuario = new Usuario();
      usuario.correo = usuarioPrueba.correo;
      usuario.contrasenia = usuarioPrueba.contrasenia;
      this.loginServ.signin(usuario);
    }
  }

}
