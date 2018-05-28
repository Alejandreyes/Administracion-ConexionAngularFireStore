import { Component, OnInit, EventEmitter } from '@angular/core';

import { CasoUso } from '../../../modelos/casouso.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CasosUsoService } from '../../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { ActividadService } from '../../../servicios/actividad.service';
import { Actividad } from '../../../modelos/actividad.model';

@Component({
    selector: 'app-agregar-actividad-principal',
    templateUrl: '/agregar-actividad-principal.component.html',
    styleUrls: ['./agregar-actividad-principal.component.css']
})
export class AgregarActividadPrincipalComponent implements OnInit {
    modalActions = new EventEmitter<string | MaterializeAction>();
    actividadForm: FormGroup;

    constructor(private fb: FormBuilder,
        private actividadServ: ActividadService,
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
        this.actividadServ.addActividadPrincipal(actividad);
    }

    onCancel() {
        this.router.navigate(['/flujos']);
    }

}