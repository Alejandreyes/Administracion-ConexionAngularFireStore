import { Component, OnInit ,EventEmitter} from '@angular/core';
import {Accion} from '../../modelos/accion.model';
import { AccionService } from '../../servicios/accion.service';
import { Router } from '@angular/router';
import { ProyectosService } from '../../servicios/proyectos.service';

import { MaterializeAction } from 'angular2-materialize';
@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.css']
})
export class AccionComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();
  acciones : Accion[];
  constructor(private accionServ: AccionService,
    private proyectosSV: ProyectosService,
    public router: Router) { }

  ngOnInit() {
    this.accionServ.getAcciones(this.proyectosSV.proyectoSelecionado.nombre).valueChanges().subscribe(item=>{
      this.acciones = item;
    });
  }
  onCreate(){
    this.router.navigate(['/agregarAccion']);
  }
  onEdit(accion: Accion){
    this.accionServ.accionSeleccionado = accion ; 
    this.router.navigate(['/editarAccion']);
  }
  onDelete(accion: Accion){
    this.accionServ.accionSeleccionado = accion;
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  eliminar(){
    this.accionServ.delete(this.accionServ.accionSeleccionado);
  }

}
