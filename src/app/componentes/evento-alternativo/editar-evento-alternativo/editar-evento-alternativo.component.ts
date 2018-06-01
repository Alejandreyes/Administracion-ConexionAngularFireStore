import { Component, OnInit, EventEmitter } from '@angular/core';
import { Evento } from '../../../modelos/evento.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventoAlternativoService } from '../../../servicios/evento-alternativo.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { CasosUsoService } from '../../../servicios/casos-uso.service';

@Component({
  selector: 'app-editar-evento-alternativo',
  templateUrl: './editar-evento-alternativo.component.html',
  styleUrls: ['./editar-evento-alternativo.component.css']
})

export class EditarEventoAlternativoComponent implements OnInit {
    eventoForm: FormGroup;
    
    constructor(private fb: FormBuilder,
        private eventoServ: EventoAlternativoService,
        public router: Router) {
        }
    
    ngOnInit(){
        this.eventoForm = this.fb.group({
            descripcion: new FormControl(
                {value: this.eventoServ.eventoSeleccionado.descripcion, disabled: false},
                [Validators.required, Validators.minLength(1)]),
            actor: new FormControl(
                {value: this.eventoServ.eventoSeleccionado.actor, disabled: false},
                [Validators.required, Validators.minLength(1)]),
            grupoDeDatos: new FormControl(
                {value: this.eventoServ.eventoSeleccionado.grupoDeDatos, disabled: false},
                [Validators.required, Validators.minLength(1)]),
            posicion: new FormControl(
                {value: this.eventoServ.eventoSeleccionado.posicion, disabled: false},
                [Validators.required, Validators.min(0), Validators.max(this.eventoServ.listaEventos.length)])
        });

    }

    onSubmit() {
        const evento = JSON.parse(JSON.stringify(this.eventoServ.eventoSeleccionado));
        evento.descripcion = this.eventoForm.value.descripcion;
        evento.actor = this.eventoForm.value.actor;
        evento.grupoDeDatos = this.eventoForm.value.grupoDeDatos;
        evento.posicion = this.eventoForm.value.posicion;

        this.eventoServ.editEvento(this.eventoServ.eventoSeleccionado, evento);
    }

    onCancel(){
        this.eventoServ.eventoSeleccionado = new Evento();
        this.router.navigate(['/eventosPrincipales']);
    }
}