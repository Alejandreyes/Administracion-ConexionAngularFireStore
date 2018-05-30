import { Component, OnInit, EventEmitter } from '@angular/core';
import { CasoUso } from '../../../modelos/casouso.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActividadPrincipalService } from '../../../servicios/actividad-principal.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { Actividad } from '../../../modelos/actividad.model';
@Component({
  selector: 'app-editar-actividad-principal',
  templateUrl: './editar-actividad-principal.component.html',
  styleUrls: ['./editar-actividad-principal.component.css']
})

export class EditarActividadPrincipalComponent implements OnInit {
    actividadForm: FormGroup;
    
    constructor(private fb: FormBuilder,
        private actividadServ: ActividadPrincipalService,
        public router: Router) {
        }
    
    ngOnInit(){
        this.actividadForm = this.fb.group({
            nombre: new FormControl(
                {value: this.actividadServ.actividadSeleccionada.nombre, disabled: false},
                [Validators.required, Validators.minLength(1)]),
            posicion: new FormControl(
                {value: this.actividadServ.actividadSeleccionada.posicion, disabled: false},
                [Validators.required, Validators.min(0), Validators.max(this.actividadServ.listaActividades.length)])
        });
    }

    onSubmit() {
        const actividad = this.actividadServ.actividadSeleccionada;
        actividad.nombre = this.actividadForm.value.nombre;
        actividad.posicion = this.actividadForm.value.posicion;

        this.actividadServ.editActividad(this.actividadServ.actividadSeleccionada, actividad);
    }

    onCancel(){
        this.actividadServ.actividadSeleccionada = new Actividad();
        this.router.navigate(['/flujos']);
    }
}