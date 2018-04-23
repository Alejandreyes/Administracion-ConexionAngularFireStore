import { Component, EventEmitter, OnInit } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../modelos/usuario.model';
import { UsuarioService } from '../../../servicios/usuario.service';
import { ProyectosService } from '../../../servicios/proyectos.service';
import { Router } from '@angular/router';

import { Proyecto } from '../../../modelos/proyecto.model';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
  analistas: Usuario[];
  proyectoForm: FormGroup;
  constructor(private fb: FormBuilder,
    private usuarioServ: UsuarioService,
    private proyectoServ: ProyectosService,
    public router: Router
  ) {

  }
  ngOnInit() {
    this.proyectoForm = this.fb.group({
      nombre: new FormControl({ value: this.proyectoServ.proyectoSelecionado.nombre, disabled: false }, [Validators.required, Validators.minLength(10)]),
      Descripcion: new FormControl({ value: this.proyectoServ.proyectoSelecionado.Descripcion, disabled: false }, [Validators.required, Validators.minLength(50)]),
      cliente: new FormControl({ value: this.proyectoServ.proyectoSelecionado.cliente, disabled: false }, [Validators.required]),
      //analistas: [''], 
      fechaInicio: new FormControl({ value: this.proyectoServ.proyectoSelecionado.fechaInicio, disabled: false }, [Validators.required]),
      fechaFin: new FormControl({ value: this.proyectoServ.proyectoSelecionado.fechaFin, disabled: false }, [Validators.required])
    });


  }
  onSubmit() {

    const proyecto = this.proyectoServ.proyectoSelecionado;
    proyecto.nombre = this.proyectoForm.value.nombre;
    proyecto.Descripcion = this.proyectoForm.value.Descripcion;
    proyecto.cliente = this.proyectoForm.value.cliente;
    proyecto.fechaInicio = this.proyectoForm.value.fechaInicio;
    proyecto.fechaFin = this.proyectoForm.value.fechaFin;
    this.proyectoServ.editProyecto(proyecto);

  }
  onCancel() {

    this.router.navigate(['/usuarios']);
  }
}
