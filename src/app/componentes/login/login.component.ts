// Bibliotecas de angular
import { Component, OnInit } from '@angular/core';
// Bibliotecas para manejar formularios en angular 
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
/* //Bibliotecas de direccionamiento de angular
import { Router } from '@angular/router';

// ----------------------------------------------
//Bibliotecas de Diseño 
import { toast } from 'angular2-materialize';

// Modelos requeridos por el servicio 
import { Usuario } from '../../modelos/usuario.model';

// Bibliotecas de Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
 */
//Login service
//import {UsuarioService} from '../../servicios/usuario.service';
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
  /* usuario: Usuario;
  user: Observable<firebase.User>; // Usuario propio de firebase 
  constructor(private pf: FormBuilder,
    private firebaseAuth: AngularFireAuth,
    public router: Router,
    //public usuarioServ : UsuarioService
    public loginServ: LoginService
  ){
    this.user = firebaseAuth.authState;
  }
 */
  constructor(private pf: FormBuilder,
    private usServ: UsuarioService,
    public loginServ: LoginService) { }

  ngOnInit() {
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


    // this.usuarioService.putUsuario( this.Usuario, this.id )
    //.subscribe(newpre => {
    //this.router.navigate(['/Usuarios'])
    // })
  }

}
