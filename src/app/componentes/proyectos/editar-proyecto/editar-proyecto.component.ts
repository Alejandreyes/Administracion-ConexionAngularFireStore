import { Component, EventEmitter, OnInit } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../modelos/usuario.model';
import { UsuarioService } from '../../../servicios/usuario.service';
import { ProyectosService } from '../../../servicios/proyectos.service';
import { Router } from '@angular/router';

import { Proyecto } from '../../../modelos/proyecto.model';
import { Opciones } from '../../../modelos/Opciones';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  proyectoForm: FormGroup;
  usuariosActivos: Usuario[];
  opciones: Opciones[];
  modalActions = new EventEmitter<string | MaterializeAction>();
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
      fechaInicio: new FormControl({ value: this.proyectoServ.proyectoSelecionado.fechaInicio, disabled: false }, [Validators.required]),
      fechaFin: new FormControl({ value: this.proyectoServ.proyectoSelecionado.fechaFin, disabled: false }, [Validators.required])
    });
    this.usuarioServ.getUsuarios().valueChanges().subscribe(items => {
      this.usuariosActivos = items;
      this.opciones = [];
      this.usuarioServ.getUsuariosProyectos(this.proyectoServ.proyectoSelecionado.nombre)
        .valueChanges().subscribe(nombres => {
          let listaNombres = []; 
          nombres.forEach(item  =>{
            listaNombres.push(item.nombre) ;
          });
          console.log(listaNombres);
          for (let usuario of this.usuariosActivos) {
            let opcion ; 
            if(listaNombres.includes(usuario.nombre)){
              opcion = new Opciones(usuario, true);
            }else {
              opcion = new Opciones(usuario, false);
            }
            this.opciones.push(opcion);
          }
        });
    });


  }
  onSubmit() {

    const proyecto = this.proyectoServ.proyectoSelecionado;
    proyecto.nombre = this.proyectoForm.value.nombre;
    proyecto.Descripcion = this.proyectoForm.value.Descripcion;
    proyecto.cliente = this.proyectoForm.value.cliente;
    proyecto.fechaInicio = this.proyectoForm.value.fechaInicio;
    proyecto.fechaFin = this.proyectoForm.value.fechaFin;
    this.proyectoServ.editProyecto(proyecto,this.usuariosActivos);

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
