import { Injectable } from '@angular/core';
import { Evento } from '../modelos/evento.model';
import { Router } from '@angular/router';
import { Actividad } from '../modelos/actividad.model';
import { ActividadAlternativaService } from '../servicios/actividad-alternativa.service';

@Injectable()
export class EventoAlternativoService {
    eventoSeleccionado: Evento = new Evento();
    listaEventos: Evento[];
    actividadMadre: Actividad;

    constructor(public router: Router,
        private actividadServ: ActividadAlternativaService){
    }

    getEventos(actividad: Actividad){
        this.actividadMadre = actividad;
        this.listaEventos = actividad.eventos;

        if(this.listaEventos == null){
            this.listaEventos = [];
        }
        return this.listaEventos;
    }

    addEvento(evento: Evento){
        this.listaEventos.push(evento);

        const actividadNueva = JSON.parse(JSON.stringify(this.actividadMadre)); 
        actividadNueva.eventos = this.listaEventos;
        this.actividadServ.editActividad(this.actividadMadre, actividadNueva);
        this.router.navigate(['/eventosAlternativos']);

    }

    editEvento(eventoAReemplazar: Evento, nuevoEvento: Evento){
        let posicionAnterior = eventoAReemplazar.posicion;
        let posicionNueva = nuevoEvento.posicion;
        console.log("Posicion anterior: " + posicionAnterior);
        console.log("Posicion actual: " + posicionNueva);
        console.log("Longitud de la lista: " + this.listaEventos.length);
        const actividadNueva = JSON.parse(JSON.stringify(this.actividadMadre));
        let eventosAux = [];

        if(posicionNueva <= posicionAnterior){
            for(var i = 0; i < posicionNueva; i++){
                eventosAux.push(this.listaEventos[i]);
            }
            eventosAux.push(nuevoEvento);
            for(var j = posicionNueva; j < this.listaEventos.length; j++){
                if(j != posicionAnterior){
                    eventosAux.push(this.listaEventos[j]);
                }
            }   
        }
        else if(posicionNueva > posicionAnterior){
            if(posicionNueva < this.listaEventos.length){
                for(var i = 0; i < posicionNueva; i++){
                    if(i != posicionAnterior){
                        eventosAux.push(this.listaEventos[i]);
                    }
                }
                eventosAux.push(nuevoEvento);
                for(var j = posicionNueva; j < this.listaEventos.length; j++){
                    eventosAux.push(this.listaEventos[j]);
                }
            }
            else{
                for(var i = 0; i < posicionNueva; i++){
                    if(i != posicionAnterior){
                        eventosAux.push(this.listaEventos[i]);
                    }
                }
                eventosAux.push(nuevoEvento);
            }  
        }

        for(var i = 0; i < eventosAux.length; i++){
            eventosAux[i].posicion = i;
        }
        console.log(this.listaEventos);
        console.log(eventosAux);

        actividadNueva.eventos = eventosAux;
        this.actividadServ.editActividad(this.actividadMadre, actividadNueva);
        this.router.navigate(['/eventosAlternativos']);
    }

   
    delete(eventoAEliminar: Evento){
        var posicion = eventoAEliminar.posicion;
        this.listaEventos.splice(posicion, 1);

        for(var i = 0; i < this.listaEventos.length; i++){
            this.listaEventos[i].posicion = i;
        }

        const actividadNueva = JSON.parse(JSON.stringify(this.actividadMadre));
        actividadNueva.eventos = this.listaEventos;
        this.actividadServ.editActividad(this.actividadMadre, actividadNueva);
    }
}