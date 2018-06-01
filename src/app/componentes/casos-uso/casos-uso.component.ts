import { Component, OnInit, EventEmitter } from '@angular/core';
import { CasoUso } from '../../modelos/casouso.model';
import { CasosUsoService } from '../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { ProyectosService } from '../../servicios/proyectos.service';
import { MaterializeAction } from 'angular2-materialize';
@Component({
  selector: 'app-casos-uso',
  templateUrl: './casos-uso.component.html',
  styleUrls: ['./casos-uso.component.css']
})
export class CasosUsoComponent implements OnInit {
  casosLista: CasoUso[];
  modalActions = new EventEmitter<string | MaterializeAction>();
  

  constructor(private casosSev: CasosUsoService,
    private proyectosSV: ProyectosService,
    public router: Router){}
  ngOnInit(): void {
    this.casosSev.getCasosUso(this.proyectosSV.proyectoSelecionado.nombre).valueChanges().subscribe(items => {
      this.casosLista = items;
    }); 
  }

  onCreate(){
    this.router.navigate(['/agregarCasoUso']);
  }
  onEdit(caso: CasoUso){
    this.casosSev.casoSeleccionado = caso ; 
    this.router.navigate(['/editarCasoUso']);
  }
  generarReporte(caso: CasoUso){
    this.casosSev.casoSeleccionado = caso ; 
    this.router.navigate(['/generaReporte']);
  }
  onDelete(caso: CasoUso){
    this.casosSev.casoSeleccionado = caso;
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  eliminar(){
    this.casosSev.delete(this.casosSev.casoSeleccionado);
  }
}
