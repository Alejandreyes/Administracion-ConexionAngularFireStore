import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CasosUsoService } from '../../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { EventoAlternativoService } from '../../../servicios/evento-alternativo.service';
import { Evento } from '../../../modelos/evento.model';

@Component({
    selector: 'app-agregar-evento-alternativo',
    templateUrl: '/agregar-evento-alternativo.component.html',
    styleUrls: ['./agregar-evento-alternativo.component.css']
})
export class AgregarEventoAlternativoComponent implements OnInit {
    modalActions = new EventEmitter<string | MaterializeAction>();
    eventoForm: FormGroup;

    constructor(private fb: FormBuilder,
        private eventoServ: EventoAlternativoService,
        public router: Router){
        }
    
    ngOnInit(){
        this.eventoForm = this.fb.group({
            descripcion: ['', [Validators.required, Validators.minLength(1)]],
            actor: ['', [Validators.required, Validators.minLength(1)]],
            grupoDeDatos: ['', [Validators.required, Validators.minLength(1)]]
        });
    }

    onSubmit() {
        const evento = new Evento();
        evento.descripcion = this.eventoForm.value.descripcion;
        evento.actor = this.eventoForm.value.actor;
        evento.grupoDeDatos = this.eventoForm.value.grupoDeDatos;
        evento.posicion = this.eventoServ.listaEventos.length;
        this.eventoServ.addEvento(evento);
    }

    onCancel() {
        this.router.navigate(['/flujos']);
    }

}