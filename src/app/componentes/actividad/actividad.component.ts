import { Component, OnInit, EventEmitter } from '@angular/core';
import { Actividad } from '../../modelos/actividad.model';
import { CasosUsoService } from '../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { ProyectosService } from '../../servicios/proyectos.service';
import { MaterializeAction } from 'angular2-materialize';
import { ActividadService } from '../../servicios/actividad.service';

@Component({
    selector:'app-actividades',
    templateUrl: './actividad.component.html',
    styleUrls: ['./actividad.component.css']
})

export class ActividadComponent implements OnInit {
    listaActividadesPrincipales: Actividad[];
    listaActividadesAlternativas: Actividad[];
    modalActionsPrincipal = new EventEmitter<string | MaterializeAction>();
    modalActionsAlternativo = new EventEmitter<string | MaterializeAction>();

    constructor(private casoServ: CasosUsoService,
        private actividadSV: ActividadService,
        public router: Router){}

    ngOnInit(): void {
        this.listaActividadesPrincipales  
            = this.actividadSV.getActividadesPrincipales(this.casoServ.casoSeleccionado);
        this.listaActividadesAlternativas
            = this.actividadSV.getActividadesAlternativas(this.casoServ.casoSeleccionado);
    }

    onCreatePrincipal(){
        this.router.navigate(['/agregarActividadPrincipal']);
    }
    
    onEditPrincipal(actividad: Actividad){
        this.actividadSV.actividadPrincipalSeleccionada = actividad;
        this.router.navigate(['/editarActividadPrincipal']);
    }

    onDeletePrincipal(actividad: Actividad){
        this.actividadSV.actividadPrincipalSeleccionada = actividad;
        this.modalActionsPrincipal.emit({ action: 'modal', params: ['open'] });
    }

    closeModalPrincipal(){
        this.modalActionsPrincipal.emit({ action: 'modal', params: ['close'] });
    }

    eliminarPrincipal(){
        this.actividadSV.deletePrincipal(this.actividadSV.actividadPrincipalSeleccionada);
    }

    onCreateAlternativa(){
        this.router.navigate(['/agregarActividadAlternativa']);
    }
    
    onEditAlternativa(actividad: Actividad){
        this.actividadSV.actividadAlternativaSeleccionada = actividad;
        this.router.navigate(['/editarActividadAlternativa']);
    }

    onDeleteAlternativa(actividad: Actividad){
        this.actividadSV.actividadAlternativaSeleccionada = actividad;
        this.modalActionsAlternativo.emit({ action: 'modal', params: ['open'] });
    }

    eliminarAlternativa(){
        this.actividadSV.deletePrincipal(this.actividadSV.actividadPrincipalSeleccionada);
    }

    closeModalAlternativa(){
        this.modalActionsAlternativo.emit({ action: 'modal', params: ['close'] });
    }


}