import { Component, OnInit, EventEmitter } from '@angular/core';
import { CasoUso } from '../../../modelos/casouso.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CasosUsoService } from '../../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
@Component({
  selector: 'app-editar-caso',
  templateUrl: './editar-caso.component.html',
  styleUrls: ['./editar-caso.component.css']
})
export class EditarCasoComponent implements OnInit {
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
  precondionesAux2 = [{ tag: 'perro' }, { tag: 'gato' }];
  precondionesAux = {
    data: [],
  };
  postcondicionesAux = {
    data: [],
  };
  flujosAux = {
    data: [],
  };
  eventosAux = {
    data: [],
  };
  requisitosEspecialesAux = {
    data: [],
  };
  actoresAux = {
    data: [],
  };


  casoUsoForm: FormGroup;
  constructor(private fb: FormBuilder,
    private casoServ: CasosUsoService,
    public router: Router) {
  }

  ngOnInit() {
    
    this.casoUsoForm = this.fb.group({
      nombre: new FormControl({ value: this.casoServ.casoSeleccionado.nombre, disabled: false }, [Validators.required, Validators.minLength(10)]),
      descripcion: new FormControl({ value: this.casoServ.casoSeleccionado.descripcion, disabled: false }, [Validators.required, Validators.minLength(25)]),
      actores: [[], Validators.required]
    });
    this.inicializar();
    this.casoUsoForm.controls['actores'].setValue(this.actores); 
    
    
  }

  inicializar(): void {
    if (this.casoServ.casoSeleccionado.precondiciones != null) {
      this.precondiciones = this.casoServ.casoSeleccionado.precondiciones;
    }
    if (this.casoServ.casoSeleccionado.postcondiciones != null) {
      this.postcondiciones = this.casoServ.casoSeleccionado.postcondiciones;
    }
    if (this.casoServ.casoSeleccionado.flujos != null) {
      this.flujos = this.casoServ.casoSeleccionado.flujos;
    }
    if (this.casoServ.casoSeleccionado.eventos != null) {
      this.eventos = this.casoServ.casoSeleccionado.eventos;
    }
    if (this.casoServ.casoSeleccionado.requisitosEspeciales != null) {
      this.requisitosEspeciales = this.casoServ.casoSeleccionado.requisitosEspeciales;
    }
    if (this.casoServ.casoSeleccionado.actores != null) {
      this.actores = this.casoServ.casoSeleccionado.actores;
    }
    this.inicia();
  }
  inicia() {
    let dataBinding = [];
    this.precondiciones.forEach(item => {
      dataBinding.push({ tag: item });
    });
    this.precondionesAux.data = dataBinding;
    dataBinding = [];
    this.postcondiciones.forEach(item => {
      dataBinding.push({ tag: item });
    });
    this.postcondicionesAux.data = dataBinding;
    dataBinding = [];
    this.flujos.forEach(item => {
      dataBinding.push({ tag: item });
    });
    this.flujosAux.data = dataBinding;
    dataBinding = [];
    this.eventos.forEach(item => {
      dataBinding.push({ tag: item });
    });
    this.eventosAux.data = dataBinding;
    dataBinding = [];
    this.requisitosEspeciales.forEach(item => {
      dataBinding.push({ tag: item });
    });
    this.requisitosEspecialesAux.data = dataBinding;
    dataBinding = [];
    this.actores.forEach(item => {
      dataBinding.push({ tag: item });
    });
    this.actoresAux.data = dataBinding;
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
    const casoUso = this.casoServ.casoSeleccionado;
    casoUso.nombre = this.casoUsoForm.value.nombre;
    casoUso.descripcion = this.casoUsoForm.value.descripcion;
    casoUso.precondiciones = this.precondiciones;
    casoUso.postcondiciones = this.postcondiciones;
    casoUso.eventos = this.eventos;
    casoUso.flujos = this.flujos;
    casoUso.requisitosEspeciales = this.requisitosEspeciales;
    casoUso.actores = this.actores;
    this.casoServ.editCasoUso(casoUso);
  }
  onCancel() {
    this.casoServ.casoSeleccionado = new CasoUso();
    this.router.navigate(['/casosDeUso']);
  }
}
