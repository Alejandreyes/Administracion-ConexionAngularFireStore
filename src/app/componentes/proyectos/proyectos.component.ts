import { Component, OnInit, EventEmitter } from '@angular/core';

//Bibliotecas de Diseño 
import { toast } from 'angular2-materialize';
import { MaterializeAction } from 'angular2-materialize';
/* 
declare var $: any;
declare var JQuery: any; */
import { Proyecto } from '../../modelos/proyecto.model';
import { Usuario } from '../../modelos/usuario.model';
import { ProyectosService } from '../../servicios/proyectos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectosLista: Proyecto[];
  proyectos: Proyecto[];
  panelOpenState: boolean = false;
  modalActions = new EventEmitter<string | MaterializeAction>();
  openModal(proyecto: Proyecto) {
    this.proyectosSV.proyectoSelecionado = proyecto;
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  constructor(private proyectosSV: ProyectosService,
    public router: Router) {
    this.proyectosSV.getProyectos().valueChanges().subscribe(items => {
      this.proyectos = items;
    });
  }

  ngOnInit() {

  }
  onCreate(){
    this.router.navigate(['/agregarProyecto']);
  }
  
  esImportante(proyecto: Proyecto): boolean {
    //let inicio: number = new Date(proyecto.fechaInicio).getTime();
    let finDia: number = new Date(proyecto.fechaFin).getDate();
    let finMes: number = new Date(proyecto.fechaFin).getMonth() + 1;
    let finAnio: number = new Date(proyecto.fechaFin).getFullYear();
    let fechaActualDia: number = (new Date()).getDate();
    let fechaActualMes: number = (new Date()).getMonth() + 1;
    let fechaActualAnio: number = (new Date()).getFullYear();
    let fin = finDia + (finMes * 30) + (finAnio * 365);
    let fechaActual = fechaActualDia + (fechaActualMes * 30) + (fechaActualAnio * 365);
    let diff = fin - fechaActual;
    if (diff < 30) {
      return true;
    }
    else {
      return false;
    }
  }

}
