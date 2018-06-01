import { Component, OnInit, EventEmitter } from '@angular/core';
import { Actividad } from '../../modelos/actividad.model';
import { CasosUsoService } from '../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { ActividadAlternativaService } from '../../servicios/actividad-alternativa.service';

@Component({
    selector:'app-actividad-alternativa',
    templateUrl: './actividad-alternativa.component.html',
    styleUrls: ['./actividad-alternativa.component.css']
})

export class ActividadAlternativaComponent implements OnInit {
    listaActividadesAlternativas: Actividad[];
    modalActions = new EventEmitter<string | MaterializeAction>();

    constructor(private casoServ: CasosUsoService,
        private actividadSV: ActividadAlternativaService,
        public router: Router){}
    
    ngOnInit(): void {
        this.listaActividadesAlternativas
            = this.actividadSV.getActividades(this.casoServ.casoSeleccionado);
        
        for(var i = 0; i < this.listaActividadesAlternativas.length; i++){
            this.listaActividadesAlternativas[i].posicion = i;
        }
    }

    onCreate(){
        this.router.navigate(['/agregarActividadAlternativa']);
    }
    
    onEdit(actividad: Actividad){
        this.actividadSV.actividadSeleccionada = actividad;
        this.router.navigate(['/editarActividadAlternativa']);
    }

    verEventos(actividad: Actividad){
        this.actividadSV.actividadSeleccionada = actividad;
        this.router.navigate(['/eventosAlternativos']);
    }

    onDelete(actividad: Actividad){
        this.actividadSV.actividadSeleccionada = actividad;
        this.modalActions.emit({ action: 'modal', params: ['open'] });
    }

    eliminar(){
        this.actividadSV.delete(this.actividadSV.actividadSeleccionada);
    }

    closeModal(){
        this.modalActions.emit({ action: 'modal', params: ['close'] });
    }

}