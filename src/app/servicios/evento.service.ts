import { Injectable } from '@angular/core';
import { Evento } from '../modelos/evento.model';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CasoUso } from '../modelos/casouso.model';
import { Actividad } from '../modelos/actividad.model';

@Injectable()
export class EventoService {
    eventoSeleccionado: Evento = new Evento();
    listaEventos: Evento[];

    constructor(public router: Router){
    }

    getEventos(actividad: Actividad){
        this.listaEventos = actividad.eventos;
    }

    addEvento(evento: Evento){
        this.listaEventos.concat(evento);
    }

    editActividad(eventoAReemplazar: Evento, nuevoEvento: Evento){
        var posicion = this.listaEventos.indexOf(eventoAReemplazar);
        this.listaEventos.splice(posicion, 1, nuevoEvento);
    }

    delete(eventoAEliminar: Evento){
        var posicion = this.listaEventos.indexOf(eventoAEliminar);
        this.listaEventos.splice(posicion, 1);
    }
    /*
    idCasoDeUso: string;
    eventoSeleccionado: Evento = new Evento();
    listaEventos: AngularFireList<Evento>;
    constructor(private firebase: AngularFireDatabase,
        public router: Router) {
    }

    getListaEventos(idCasoDeUso: string) {
        this.listaEventos = this.firebase.list('evento/' + idCasoDeUso);
        this.idCasoDeUso = idCasoDeUso;
        return this.listaEventos;
    }
    
    addEvento(evento: Evento) {
        this.listaEventos.push(evento).then((response) => {
            const key = response.key;
            evento.id = key;
            this.listaEventos.set(key, evento);
        });;
        this.router.navigate(['/casosDeUso']);
    }

    editCasoUso(eventoEditado: Evento) {
        this.listaEventos.set(eventoEditado.id, eventoEditado);
        this.router.navigate(['/casosDeUso']);
    }
    
    delete(eventoAEliminar: Evento) {
        this.listaEventos.remove(eventoAEliminar.id);
    }

    setPosition(eventoAMover: Evento, posicion: number){
        
    }
    */
}