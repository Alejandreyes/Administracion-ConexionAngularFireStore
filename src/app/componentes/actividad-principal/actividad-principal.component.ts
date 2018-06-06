import { Component, OnInit, EventEmitter } from '@angular/core';
import { Actividad } from '../../modelos/actividad.model';
import { CasosUsoService } from '../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { ActividadPrincipalService } from '../../servicios/actividad-principal.service';
import { EventoPrincipalComponent } from '../evento-principal/evento-principal.component';

@Component({
    selector:'app-actividades',
    templateUrl: './actividad-principal.component.html',
    styleUrls: ['./actividad-principal.component.css']
})

export class ActividadPrincipalComponent implements OnInit {
    listaActividadesPrincipales: Actividad[];
    modalActions = new EventEmitter<string | MaterializeAction>();

    constructor(private casoServ: CasosUsoService,
        private actividadSV: ActividadPrincipalService,
        public router: Router){}

    ngOnInit(): void {
        this.listaActividadesPrincipales  
            = this.actividadSV.getActividades(this.casoServ.casoSeleccionado);
    }

    onCreate(){
        this.router.navigate(['/agregarActividadPrincipal']);
    }
    
    onEdit(actividad: Actividad){
        this.actividadSV.actividadSeleccionada = actividad;
        this.router.navigate(['/editarActividadPrincipal']);
    }

    verEventos(actividad: Actividad){
        this.actividadSV.actividadSeleccionada = actividad;
        this.router.navigate(['/eventosPrincipales']);
    }


    onDelete(actividad: Actividad){
        this.actividadSV.actividadSeleccionada = actividad;
        this.modalActions.emit({ action: 'modal', params: ['open'] });
    }

    closeModal(){
        this.modalActions.emit({ action: 'modal', params: ['close'] });
    }

    eliminar(){
        this.actividadSV.delete(this.actividadSV.actividadSeleccionada);
        
    }

    regresar(){
        this.router.navigate(['/casosDeUso']);
    }
}