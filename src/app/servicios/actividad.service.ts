import { Injectable } from '@angular/core';
import { Evento } from '../modelos/evento.model';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CasoUso } from '../modelos/casouso.model';
import { Actividad } from '../modelos/actividad.model';

@Injectable()
export class ActividadService {
    actividadPrincipalSeleccionada: Actividad = new Actividad();
    actividadAlternativaSeleccionada: Actividad = new Actividad();
    listaActividadesPrincipales: Actividad[] = [];
    listaActividadesAlternativas: Actividad[] = [];

    constructor(public router: Router){
    }

    getActividadesAlternativas(casoUso: CasoUso){
        console.log("Caso de uso pasado por parámetro: " + casoUso.nombre);
        console.log("Lista de actividades:" + casoUso.actividadesAlternativas)
        this.listaActividadesAlternativas = casoUso.actividadesAlternativas;
        console.log(this.listaActividadesAlternativas);
        return this.listaActividadesAlternativas;
    }

    addActividadAlternativa(actividad: Actividad){
        this.listaActividadesAlternativas.concat(actividad);
        this.router.navigate(['/flujos'])
    }

    editActividadAlternativa(actividadAReemplazar: Actividad, nuevaActividad: Actividad){
        var posicion = this.listaActividadesAlternativas.indexOf(actividadAReemplazar);
        this.listaActividadesAlternativas.splice(posicion, 1, nuevaActividad);
    }
    
    deleteAlternativa(actividadAEliminar: Actividad){
        var posicion = this.listaActividadesAlternativas.indexOf(actividadAEliminar);
        this.listaActividadesAlternativas.splice(posicion, 1);
    }

    getActividadesPrincipales(casoUso: CasoUso){
        this.listaActividadesPrincipales = casoUso.actividadesPrincipales;
        return this.listaActividadesPrincipales;
    }

    addActividadPrincipal(actividad: Actividad){
        this.listaActividadesPrincipales.concat(actividad);
        this.router.navigate(['/flujos']);
    }

    editActividadPrincipal(actividadAReemplazar: Actividad, nuevaActividad: Actividad){
        var posicion = this.listaActividadesPrincipales.indexOf(actividadAReemplazar);
        this.listaActividadesPrincipales.splice(posicion, 1, nuevaActividad);
    }
    
    deletePrincipal(actividadAEliminar: Actividad){
        var posicion = this.listaActividadesPrincipales.indexOf(actividadAEliminar);
        this.listaActividadesPrincipales.splice(posicion, 1);
    }
}
