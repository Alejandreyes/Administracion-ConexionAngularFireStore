import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CasoUso } from '../modelos/casouso.model';
import { Actividad } from '../modelos/actividad.model';
import { CasosUsoService } from './casos-uso.service';

@Injectable()
export class ActividadAlternativaService {
    actividadSeleccionada: Actividad = new Actividad();
    listaActividades: Actividad[];
    casoUsoPadre: CasoUso;

    constructor(public router: Router,
        private casoServ: CasosUsoService){
    }

    getActividades(casoUso: CasoUso){
        this.casoUsoPadre = casoUso;
        this.listaActividades = casoUso.actividadesAlternativas;
        if(this.listaActividades == null){
            this.listaActividades = [];
        }
        return this.listaActividades;
    }

    addActividad(actividad: Actividad){
        this.listaActividades.push(actividad);

        const casoUsoNuevo = this.casoUsoPadre;
        casoUsoNuevo.actividadesAlternativas = this.listaActividades;
        this.casoServ.editCasoUso(casoUsoNuevo);
        this.router.navigate(['/flujos'])
    }

    editActividad(actividadAReemplazar: Actividad, nuevaActividad: Actividad){
        let posicionAnterior = actividadAReemplazar.posicion;
        let posicionNueva = nuevaActividad.posicion;
        console.log("Posicion anterior: " + posicionAnterior);
        console.log("Posicion actual: " + posicionNueva);
        console.log("Longitud de la lista: " + this.listaActividades.length);
        const casoUsoNuevo = this.casoUsoPadre;
        let actividadesAux = [];

        if(posicionNueva <= posicionAnterior){
            for(var i = 0; i < posicionNueva; i++){
                actividadesAux.push(this.listaActividades[i]);
            }
            actividadesAux.push(nuevaActividad);
            for(var j = posicionNueva; j < this.listaActividades.length; j++){
                if(j != posicionAnterior){
                    actividadesAux.push(this.listaActividades[j]);
                }
            }   
        }
        else if(posicionNueva > posicionAnterior){
            if(posicionNueva < this.listaActividades.length){
                for(var i = 0; i < posicionNueva; i++){
                    if(i != posicionAnterior){
                        actividadesAux.push(this.listaActividades[i]);
                    }
                }
                actividadesAux.push(nuevaActividad);
                for(var j = posicionNueva; j < this.listaActividades.length; j++){
                    actividadesAux.push(this.listaActividades[j]);
                }
            }
            else{
                for(var i = 0; i < posicionNueva; i++){
                    if(i != posicionAnterior){
                        actividadesAux.push(this.listaActividades[i]);
                    }
                }
                actividadesAux.push(nuevaActividad);
            }  
        }

        for(var i = 0; i < actividadesAux.length; i++){
            actividadesAux[i].posicion = i;
        }
        console.log(this.listaActividades);
        console.log(actividadesAux);

        casoUsoNuevo.actividadesAlternativas = actividadesAux;
        this.casoServ.editCasoUso(casoUsoNuevo);
        this.router.navigate(['/flujos']);
    }
    
    
    delete(actividadAEliminar: Actividad){
        var posicion = this.listaActividades.indexOf(actividadAEliminar);
        this.listaActividades.splice(posicion, 1);

        for(var i = 0; i < this.listaActividades.length; i++){
            this.listaActividades[i].posicion = i;
        }

        const casoUsoNuevo = this.casoUsoPadre;
        casoUsoNuevo.actividadesAlternativas = this.listaActividades;
        this.casoServ.editCasoUso(casoUsoNuevo)
    }

}