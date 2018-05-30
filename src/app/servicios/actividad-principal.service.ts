import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CasoUso } from '../modelos/casouso.model';
import { Actividad } from '../modelos/actividad.model';
import { CasosUsoService } from './casos-uso.service';

@Injectable()
export class ActividadPrincipalService {
    actividadSeleccionada: Actividad = new Actividad();
    listaActividades: Actividad[];
    casoUsoPadre: CasoUso;

    constructor(public router: Router,
        private casoServ: CasosUsoService){
    }

    getActividades(casoUso: CasoUso){
        this.casoUsoPadre = casoUso;
        this.listaActividades = casoUso.actividadesPrincipales;
        if(this.listaActividades == null){
            this.listaActividades = [];
        }
        return this.listaActividades;
    }

    addActividad(actividad: Actividad){
        this.listaActividades.push(actividad);

        const casoUsoNuevo = this.casoUsoPadre;
        casoUsoNuevo.actividadesPrincipales = this.listaActividades;
        this.casoServ.editCasoUsoActividad(casoUsoNuevo);
        this.router.navigate(['/flujos']);
    }

    editActividad(actividadAReemplazar: Actividad, nuevaActividad: Actividad){
        var posicion = this.listaActividades.indexOf(actividadAReemplazar);
        this.listaActividades.splice(posicion, 1, nuevaActividad);

        const casoUsoActividad = this.casoUsoPadre;
        casoUsoActividad.actividadesPrincipales = this.listaActividades;
        this.casoServ.editCasoUsoActividad(casoUsoActividad);
        this.router.navigate(['/flujos']);
    }
    
    delete(actividadAEliminar: Actividad){
        var posicion = this.listaActividades.indexOf(actividadAEliminar);
        this.listaActividades.splice(posicion, 1);

        const casoUsoActividad = this.casoUsoPadre;
        casoUsoActividad.actividadesPrincipales = this.listaActividades;
        this.casoServ.editCasoUsoActividad(casoUsoActividad);
    }
}
