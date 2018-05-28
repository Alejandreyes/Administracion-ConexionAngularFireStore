import { Component, EventEmitter, OnInit } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
declare var Materialize: any;
import { Proyecto } from '../../../modelos/proyecto.model';
import { Usuario } from '../../../modelos/usuario.model';
import { UsuarioService } from '../../../servicios/usuario.service';
import { ProyectosService } from '../../../servicios/proyectos.service';
import { Router } from '@angular/router';
import { Opciones } from '../../../modelos/Opciones';
@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})


export class AgregarProyectoComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();
  proyectoForm: FormGroup;
  usuariosActivos: Usuario[];
  opciones: Opciones[];


  constructor(private fb: FormBuilder,
    private usuarioServ: UsuarioService,
    private proyectoServ: ProyectosService,
    public router: Router) {

  }
  ngOnInit() {
    this.proyectoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      Descripcion: ['', [Validators.required, Validators.minLength(50)]],
      cliente: ['', Validators.required],
      fechaInicio: [''],
      fechaFin: ['']
    });
    this.usuarioServ.getUsuarios().valueChanges().subscribe(items => {
      this.usuariosActivos = items;
      this.opciones = [];
      for (let usuario of this.usuariosActivos) {
        let opcion = new Opciones(usuario, false);
        this.opciones.push(new Opciones(usuario, false));
      }
    });

  }
  onSubmit() {
    const proyecto = new Proyecto();
    proyecto.nombre = this.proyectoForm.value.nombre;
    proyecto.Descripcion = this.proyectoForm.value.Descripcion;
    proyecto.cliente = this.proyectoForm.value.cliente;
    proyecto.fechaInicio = this.proyectoForm.value.fechaInicio;
    proyecto.fechaFin = this.proyectoForm.value.fechaFin;
    this.proyectoServ.addProyecto(proyecto, this.usuariosActivos);

  }
  onCancel() {
    this.router.navigate(['/usuarios']);
  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  aceptar() {
    let selecionados = this.opciones.filter(opcion => {
      return opcion.seleccionado;
    });
    let aux: Usuario[] = [];
    selecionados.forEach(sel => {
      aux.push(sel.usuario);
    });
    this.usuariosActivos = aux;
  }

  change(newValue, opcion: Opciones) {
    opcion.seleccionado = !opcion.seleccionado;
  }
}