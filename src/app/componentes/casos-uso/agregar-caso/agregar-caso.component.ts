import { Component, OnInit, EventEmitter } from '@angular/core';

import { CasoUso } from '../../../modelos/casouso.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CasosUsoService } from '../../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
@Component({
  selector: 'app-agregar-caso',
  templateUrl: './agregar-caso.component.html',
  styleUrls: ['./agregar-caso.component.css']
})
export class AgregarCasoComponent implements OnInit {
  chipsActions = new EventEmitter<string | MaterializeAction>();
  precondiciones: string[] = [];
  postcondiciones: string[] = [];
  flujos: string[] = [];
  eventos: string[] = [];
  requisitosEspeciales: string[] = [];
  actores: string[] = [];
  chipsPlaceholder = {
    placeholder: '+Ingresa Campo',
    secondaryPlaceholder: 'Ingresa un nuevo campo',
  };
  autocompleteInit = {
    autocompleteOptions: {
      data: {
        'Administrador': null,
        'Analista': null,
      },
      limit: 2
    }
  };
  casoUsoForm: FormGroup;
  constructor(private fb: FormBuilder,
    private casoServ: CasosUsoService,
    public router: Router) {
  }

  ngOnInit() {
    this.casoUsoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      descripcion: ['', [Validators.required, Validators.minLength(25)]],
      actores: [[], Validators.required]
    });
  }
  add(chip, nombreLista: string) {
    switch (nombreLista) {
      case 'precondiciones':
        this.precondiciones.push(chip.tag);
        break;
      case 'postcondiciones':
        this.postcondiciones.push(chip.tag);
        break;
      case 'flujos':
        this.flujos.push(chip.tag);
        break;
      case 'eventos':
        this.eventos.push(chip.tag);
        break;
      case 'requisitosEspeciales':
        this.requisitosEspeciales.push(chip.tag);
        break;
      case 'actores':
        this.actores.push(chip.tag);
        this.casoUsoForm.controls['actores'].patchValue(this.actores);
        break;
    }

  }

  delete(chip, nombreLista: string) {
    switch (nombreLista) {
      case 'precondiciones':
        this.precondiciones = this.precondiciones.filter(item => { return item != chip.tag });
        break;
      case 'postcondiciones':
        this.postcondiciones = this.precondiciones.filter(item => { return item != chip.tag });
        break;
      case 'flujos':
        this.flujos = this.flujos.filter(item => { return item != chip.tag });
        break;
      case 'eventos':
        this.eventos = this.eventos.filter(item => { return item != chip.tag });
        break;
      case 'requisitosEspeciales':
        this.requisitosEspeciales = this.requisitosEspeciales.filter(item => { return item != chip.tag });
        break;
      case 'actores':
        this.actores = this.actores.filter(item => { return item != chip.tag });
        this.casoUsoForm.controls['actores'].patchValue(this.actores);
        break;
    }

  }

  onSubmit() {
    const casoUso = new CasoUso();
    casoUso.nombre = this.casoUsoForm.value.nombre;
    casoUso.descripcion = this.casoUsoForm.value.descripcion;
    casoUso.precondiciones = this.precondiciones; 
    casoUso.postcondiciones  = this.postcondiciones;
    casoUso.eventos = this.eventos ; 
    casoUso.flujos = this.flujos; 
    casoUso.requisitosEspeciales = this.requisitosEspeciales; 
    casoUso.actores = this.actores;
    this.casoServ.addCasoUso(casoUso);
  }
}
