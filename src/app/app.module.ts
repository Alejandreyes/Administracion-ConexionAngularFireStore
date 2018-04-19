import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './componentes/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms'; // Servivio que ayuda la validacion de formularios de angular

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

// Libreria de materialize 
import { MaterializeModule } from 'angular2-materialize'; 

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
  { path: 'usuarios', component: UsuarioComponent },
  { path : 'agregarUsuario' , component :AgregarUsuarioComponent },
  { path : 'editarUsuario' , component :EditarUsuarioComponent },
  { path : 'eliminarUsuario' , component :EliminarUsuarioComponent },
  { path : 'agregarProyecto' , component : AgregarProyectoComponent},
  { path : 'editarProyecto' , component : EditarProyectoComponent},
  { path : 'eliminarProyecto' , component :EliminarProyectoComponent },
  { path : 'agregarCasoUso' , component : AgregarCasoComponent},
  { path : 'editarCasoUso' , component : EditarCasoComponent},
  { path : 'eliminarCasoUso' , component :EliminarCasoComponent },
  { path : 'agregarAccion' , component : AgregarAccionComponent},
  { path : 'editarAccion' , component : EditarAccionComponent},
  { path : 'eliminarAccion' , component :EliminarAccionComponent },
//  { path : 'proyectos' , component :ProyectosComponent },
//  { path : 'casosDeUso' , component : CasosUsoComponent},
//  { path : 'accion' , component : AccionComponent},
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
    AccionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AccionService,
    CasosUsoService,
    LoginService,
    ProyectosService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
