import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AccionService } from '../../../servicios/accion.service';
import { Router } from '@angular/router';
import {Accion} from '../../../modelos/accion.model';
@Component({
  selector: 'app-editar-accion',
  templateUrl: './editar-accion.component.html',
  styleUrls: ['./editar-accion.component.css']
})
export class EditarAccionComponent implements OnInit {
  accionForm: FormGroup;
  constructor(private fb: FormBuilder,
    private accionServ: AccionService,
    public router: Router) {
  }

  ngOnInit() {
    this.accionForm = this.fb.group({
      nombre: new FormControl({ value: this.accionServ.accionSeleccionado.nombre, disabled: false }, [Validators.required, Validators.minLength(10)]),
      descripcion: new FormControl({ value: this.accionServ.accionSeleccionado.descripcion, disabled: false }, [Validators.required, Validators.minLength(25)]),
    });
  }
  onSubmit() {
    const accion = this.accionServ.accionSeleccionado;
    accion.nombre = this.accionForm.value.nombre;
    accion.descripcion = this.accionForm.value.descripcion;
    this.accionServ.editAccion(accion);
  }
  onCancel() {
    this.accionServ.accionSeleccionado = new Accion();
    this.router.navigate(['/accion']);
  }


}
