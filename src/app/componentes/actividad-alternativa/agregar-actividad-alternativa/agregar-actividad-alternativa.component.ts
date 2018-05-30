import { Component, OnInit, EventEmitter } from '@angular/core';

import { CasoUso } from '../../../modelos/casouso.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CasosUsoService } from '../../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { ActividadAlternativaService } from '../../../servicios/actividad-alternativa.service';
import { Actividad } from '../../../modelos/actividad.model';

@Component({
    selector: 'app-agregar-actividad',
    templateUrl: '/agregar-actividad-alternativa.component.html',
    styleUrls: ['./agregar-actividad-alternativa.component.css']
})
export class AgregarActividadAlternativaComponent implements OnInit {
    modalActions = new EventEmitter<string | MaterializeAction>();
    actividadForm: FormGroup;

    
    constructor(private fb: FormBuilder,
        private actividadServ: ActividadAlternativaService,
        public router: Router){
        }
    
    ngOnInit(){
        this.actividadForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(1)]]
        });
    }

    onSubmit() {
        const actividad = new Actividad();
        actividad.nombre = this.actividadForm.value.nombre;
        this.actividadServ.addActividad(actividad);
    }

    onCancel() {
        this.router.navigate(['/flujos']);
    }

}