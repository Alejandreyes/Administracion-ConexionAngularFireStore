import { Component, EventEmitter, OnInit } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
declare var Materialize: any;
import { Proyecto } from '../../../modelos/proyecto.model';
import { Usuario } from '../../../modelos/usuario.model';
import { UsuarioService } from '../../../servicios/usuario.service';
import { ProyectosService } from '../../../servicios/proyectos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {

  analistas: Usuario[];
  proyectoForm: FormGroup;
  constructor(private fb: FormBuilder,
    private usuarioServ: UsuarioService,
    private proyectoServ : ProyectosService,
    public router: Router
  ) {

  }
  ngOnInit() {
    this.proyectoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      Descripcion: ['', [Validators.required, Validators.minLength(50)]],
      cliente: ['', Validators.required],
      //analistas: [''], 
      fechaInicio: [''],
      fechaFin: ['']
    });
  }
  onSubmit() {

    const proyecto = new Proyecto();
    proyecto.nombre = this.proyectoForm.value.nombre;
    proyecto.Descripcion = this.proyectoForm.value.Descripcion; 
    proyecto.cliente = this.proyectoForm.value.cliente;
    proyecto.fechaInicio = this.proyectoForm.value.fechaInicio;
    proyecto.fechaFin = this.proyectoForm.value.fechaFin;
    this.proyectoServ.addProyecto(proyecto);
    
  }
  onCancel() {
    
    this.router.navigate(['/usuarios']);
  }
}
