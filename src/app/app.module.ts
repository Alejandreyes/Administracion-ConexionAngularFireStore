import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './componentes/login/login.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms'; // Servivio que ayuda la validacion de formularios de angular
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Componentes creados por el usuario
import { AppComponent } from './app.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { AgregarProyectoComponent } from './componentes/proyectos/agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './componentes/proyectos/editar-proyecto/editar-proyecto.component';
import { EliminarProyectoComponent } from './componentes/proyectos/eliminar-proyecto/eliminar-proyecto.component';
import { EliminarUsuarioComponent } from './componentes/usuario/eliminar-usuario/eliminar-usuario.component';
import { AgregarUsuarioComponent } from './componentes/usuario/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './componentes/usuario/editar-usuario/editar-usuario.component';
import { EditarCasoComponent } from './componentes/casos-uso/editar-caso/editar-caso.component';
import { AgregarCasoComponent } from './componentes/casos-uso/agregar-caso/agregar-caso.component';
import { EliminarCasoComponent } from './componentes/casos-uso/eliminar-caso/eliminar-caso.component';
import { EliminarAccionComponent } from './componentes/accion/eliminar-accion/eliminar-accion.component';
import { EditarAccionComponent } from './componentes/accion/editar-accion/editar-accion.component';
import { AgregarAccionComponent } from './componentes/accion/agregar-accion/agregar-accion.component';
import { GenerarReporteComponent } from './componentes/generar-reporte/generar-reporte.component';
import { CasosUsoComponent } from './componentes/casos-uso/casos-uso.component';
import { AccionComponent } from './componentes/accion/accion.component';
import { BuscarUsuarioComponent } from './componentes/usuario/buscar-usuario/buscar-usuario.component';
// Libreria de materialize 
import {MatButtonModule, MatCheckboxModule,MatNativeDateModule,
  MatToolbarModule,MatInputModule, MatDatepickerModule,
  MatFormFieldModule, MatExpansionModule, MatGridListModule} from '@angular/material';

import {MaterializeModule} from "angular2-materialize";  
import {environment} from '../environments/environment';
// Importar Servicios de Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule  } from 'angularfire2/database'; 
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

// Importar los sevicios declarados
import {AccionService} from './servicios/accion.service';
import {CasosUsoService}  from './servicios/casos-uso.service';
import {LoginService} from './servicios/login.service';
import {ProyectosService} from './servicios/proyectos.service';
import {UsuarioService} from './servicios/usuario.service';

// las vistas con sus respectivas rutas 
const routes: Routes = [
  { path: '', component: LoginComponent},
  //{ path: 'usuarios', component: UsuarioComponent, canActivate: [LoginService] },
  { path: 'usuarios', component: UsuarioComponent, canActivate: [LoginService]  },
  { path : 'agregarUsuario' , component :AgregarUsuarioComponent, canActivate: [LoginService] },
  { path : 'editarUsuario' , component :EditarUsuarioComponent, canActivate: [LoginService] },
  { path : 'eliminarUsuario' , component :EliminarUsuarioComponent, canActivate: [LoginService] },
  { path : 'agregarProyecto' , component : AgregarProyectoComponent, canActivate: [LoginService]},
 { path : 'editarProyecto' , component : EditarProyectoComponent, canActivate: [LoginService]},
  { path : 'eliminarProyecto' , component :EliminarProyectoComponent, canActivate: [LoginService] },
  //{ path : 'agregarCasoUso' , component : AgregarCasoComponent, canActivate: [LoginService]},
  { path : 'agregarCasoUso' , component : AgregarCasoComponent, canActivate: [LoginService]},
  { path : 'editarCasoUso' , component : EditarCasoComponent, canActivate: [LoginService]},
  { path : 'eliminarCasoUso' , component :EliminarCasoComponent, canActivate: [LoginService] },
  { path : 'agregarAccion' , component : AgregarAccionComponent, canActivate: [LoginService]},
  { path : 'editarAccion' , component : EditarAccionComponent, canActivate: [LoginService]},
  { path : 'eliminarAccion' , component :EliminarAccionComponent , canActivate: [LoginService]},
  { path : 'buscarUsuario' , component : BuscarUsuarioComponent, canActivate: [LoginService]},
   { path : 'proyectos' , component :ProyectosComponent , canActivate: [LoginService] },
  { path : 'casosDeUso' , component : CasosUsoComponent, canActivate: [LoginService]},
 { path : 'accion' , component : AccionComponent, canActivate: [LoginService]},

 //{ path : 'accion' , component : AccionComponent},
  { path : 'generaReporte' , component : GenerarReporteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    ProyectosComponent,
    AgregarProyectoComponent,
    EditarProyectoComponent,
    EliminarProyectoComponent,
    EliminarUsuarioComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    EditarCasoComponent,
    AgregarCasoComponent,
    EliminarCasoComponent,
    EliminarAccionComponent,
    EditarAccionComponent,
    AgregarAccionComponent,
    GenerarReporteComponent,
    CasosUsoComponent,
    AccionComponent,
    BuscarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule, 
    AngularFireDatabaseModule,
    BrowserAnimationsModule,MatToolbarModule,MatFormFieldModule, MatExpansionModule,
    MatButtonModule, MatCheckboxModule,MatDatepickerModule, MatInputModule,MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AccionService,
    CasosUsoService,
    LoginService,
    ProyectosService,
    UsuarioService,
    Location, 
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
