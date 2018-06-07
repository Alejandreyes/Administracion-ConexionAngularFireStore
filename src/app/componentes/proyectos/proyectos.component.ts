import { Component, OnInit, EventEmitter ,OnChanges, SimpleChanges} from '@angular/core';

//Bibliotecas de Diseño 
import { toast } from 'angular2-materialize';
import { MaterializeAction } from 'angular2-materialize';

import { Proyecto } from '../../modelos/proyecto.model';
import { Usuario } from '../../modelos/usuario.model';
import { ProyectosService } from '../../servicios/proyectos.service';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit,OnChanges {
  proyectos: Proyecto[] = [];
  modalActions = new EventEmitter<string | MaterializeAction>();
  constructor(private proyectosSV: ProyectosService,
    public logServ: LoginService,
    public router: Router) {
  }

  ngOnInit() {
    this.proyectosSV.getProyectos().valueChanges().subscribe(items => {
      let usu = this.logServ.usuarioLogueado;
      if (usu.rol == 'ANALISTA') {
        items.forEach(item => {
          if(usu.proyectos != undefined && ((usu.proyectos.indexOf(item.id)) >= 0) ){
            this.proyectos.push(item);     
          }
        });        
      } else {
        this.proyectos = items;
      }
    });     
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.proyectosSV.getProyectos().valueChanges().subscribe(items => {
      let usu = this.logServ.usuarioLogueado;
      if (usu.rol == 'ANALISTA') {
        items.forEach(item => {
          if(usu.proyectos != undefined && ((usu.proyectos.indexOf(item.id)) >= 0) ){
            this.proyectos.push(item);     
          }
        });        
      } else {
        this.proyectos = items;
      }
    });    
  }
  onCreate() {
    this.router.navigate(['/agregarProyecto']);
  }
  onEdit(proyecto: Proyecto) {
    this.proyectosSV.proyectoSelecionado = proyecto;
    this.router.navigate(['/editarProyecto']);
  }

  esImportante(proyecto: Proyecto): boolean {
    let fechaDesc: string[] = proyecto.fechaFin.split("/");
    let fechaDescFormat: string = fechaDesc[1] + "/" + fechaDesc[0] + "/" + fechaDesc[2];
    let finDia: number = new Date(fechaDescFormat).getDate();
    let finMes: number = new Date(fechaDescFormat).getMonth() + 1;
    let finAnio: number = new Date(fechaDescFormat).getFullYear();
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
  crearCasoUso(proyecto: Proyecto) {
    this.proyectosSV.proyectoSelecionado = proyecto;
    this.router.navigate(['/casosDeUso']);
  }
  openModal(proyecto: Proyecto) {
    this.proyectosSV.proyectoSelecionado = proyecto;
    this.modalActions.emit({ action: "modal", params: ['open'] });

  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  onDelete(){
    let proyecto = this.proyectosSV.proyectoSelecionado; 
    this.proyectosSV.removeProyecto(proyecto);
  }
}
