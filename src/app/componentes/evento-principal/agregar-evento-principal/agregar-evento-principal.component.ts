import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CasosUsoService } from '../../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { EventoPrincipalService } from '../../../servicios/evento-principal.service';
import { Evento } from '../../../modelos/evento.model';

@Component({
    selector: 'app-agregar-evento-principal',
    templateUrl: '/agregar-evento-principal.component.html',
    styleUrls: ['./agregar-evento-principal.component.css']
})
export class AgregarEventoPrincipalComponent implements OnInit {
    modalActions = new EventEmitter<string | MaterializeAction>();
    eventoForm: FormGroup;

    constructor(private fb: FormBuilder,
        private eventoServ: EventoPrincipalService,
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
        this.router.navigate(['/eventosPrincipales']);
    }

}