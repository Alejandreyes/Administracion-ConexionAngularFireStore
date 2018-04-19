import { Component, OnInit } from '@angular/core';
declare var $ : any ; 
declare var JQuery : any;
import { Proyecto } from '../../modelos/proyecto.model';
import { Usuario } from '../../modelos/usuario.model';
import { ProyectosService } from '../../servicios/proyectos.service';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectosLista : Proyecto[];
  proyectos: Proyecto[];
  constructor(private proyectosSV:ProyectosService) { 
    this.proyectosSV.getProyectos().valueChanges().subscribe(items=> {
      this.proyectos = items;
    });
    
  }
  
  ngOnInit() {
  
  }

  esImportante(nombre: String) : boolean{
    if(nombre == "Administrador"){
      return true ;
    }
    else{
      return false;
    }
  }

}
