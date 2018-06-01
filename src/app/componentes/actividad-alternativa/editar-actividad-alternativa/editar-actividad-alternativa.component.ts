import { Component, OnInit, EventEmitter } from '@angular/core';
import { CasoUso } from '../../../modelos/casouso.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActividadAlternativaService } from '../../../servicios/actividad-alternativa.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { Actividad } from '../../../modelos/actividad.model';
import { CasosUsoService } from '../../../servicios/casos-uso.service';

@Component({
  selector: 'app-editar-actividad-principal',
  templateUrl: './editar-actividad-alternativa.component.html',
  styleUrls: ['./editar-actividad-alternativa.component.css']
})

export class EditarActividadAlternativaComponent implements OnInit {
    actividadForm: FormGroup;
    listaActividadesAlternativas: Actividad[];
    
    constructor(private fb: FormBuilder,
        private casoServ: CasosUsoService,
        private actividadServ: ActividadAlternativaService,
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
        const actividad = JSON.parse(JSON.stringify(this.actividadServ.actividadSeleccionada)); 
        actividad.nombre = this.actividadForm.value.nombre;
        actividad.posicion = this.actividadForm.value.posicion;
        this.actividadServ.editActividad(this.actividadServ.actividadSeleccionada, actividad);
    }

    onCancel(){
        this.actividadServ.actividadSeleccionada = new Actividad();
        this.router.navigate(['/flujos']);
    }
}