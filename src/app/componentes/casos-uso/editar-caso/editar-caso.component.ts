import { Component, OnInit, EventEmitter,OnDestroy } from '@angular/core';
import { CasoUso } from '../../../modelos/casouso.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CasosUsoService } from '../../../servicios/casos-uso.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { Evento } from '../../../modelos/evento.model';
import { Actividades } from '../../../modelos/actividades.model';

import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { AccionService } from '../../../servicios/accion.service';
@Component({
  selector: 'app-editar-caso',
  templateUrl: './editar-caso.component.html',
  styleUrls: ['./editar-caso.component.css']
})
export class EditarCasoComponent implements OnInit, OnDestroy {
  chipsActions = new EventEmitter<string | MaterializeAction>();


  precondiciones: string[] = [];
  postcondiciones: string[] = [];
  
  acciones = [];
  indiceSelecionado: number;
  actoresSistema = ['Actor', 'Sistema'];
  eventosAccionSeleccionada: Evento[];
  actorSelecionado: string;
  actividadSelecionada;
  modalActions = new EventEmitter<string | MaterializeAction>();
  modalActions2 = new EventEmitter<string | MaterializeAction>();
  eventoForm: FormGroup;
  listaEventosPrincipales: Actividades[] = [];
  listaEventosAlternativos : Actividades[] = [] ; 
  listaSelecionada : string ; 

  selecionado: string;
  
  
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
    private accionServ: AccionService,
    public router: Router,
    public dragula: DragulaService) {
      dragula.setOptions('bag-items', {
        revertOnSpill: true
      });
      dragula.setOptions('bag-items2', {
        revertOnSpill: true
      });
      dragula.setOptions('bag-items3', {
        revertOnSpill: true
      });
  }

  ngOnInit() {
    window.history.replaceState({} , "","/casosDeUso") ;
    this.casoUsoForm = this.fb.group({
      nombre: new FormControl({ value: this.casoServ.casoSeleccionado.nombre, disabled: false }, [Validators.required, Validators.minLength(10)]),
      descripcion: new FormControl({ value: this.casoServ.casoSeleccionado.descripcion, disabled: false }, [Validators.required, Validators.minLength(25)]),
      actores: [[], Validators.required]
    });
    this.eventoForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      actor: [''],
      grupoDatos: ['', Validators.required]
    });
    this.accionServ.getAcciones().valueChanges().subscribe(item => {
      this.acciones = item;
    });
    this.inicializar();
    this.casoUsoForm.controls['actores'].setValue(this.actores); 
    this.listaEventosPrincipales =  (this.casoServ.casoSeleccionado.actividadesPrincipales == undefined)?[] : this.casoServ.casoSeleccionado.actividadesPrincipales;
    this.listaEventosAlternativos =  (this.casoServ.casoSeleccionado.actividadesAlternativas == undefined)?[]:this.casoServ.casoSeleccionado.actividadesAlternativas;
  }
  ngOnDestroy() {
    this.dragula.destroy('bag-items');
    this.dragula.destroy('bag-items2');
    this.dragula.destroy('bag-items3');
  }

  inicializar(): void {
    if (this.casoServ.casoSeleccionado.precondiciones != null) {
      this.precondiciones = this.casoServ.casoSeleccionado.precondiciones;
    }
    if (this.casoServ.casoSeleccionado.postcondiciones != null) {
      this.postcondiciones = this.casoServ.casoSeleccionado.postcondiciones;
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
    
    casoUso.actividadesPrincipales = this.listaEventosPrincipales; 
    casoUso.actividadesAlternativas = this.listaEventosAlternativos;
    casoUso.requisitosEspeciales = this.requisitosEspeciales;
    casoUso.actores = this.actores;
    this.casoServ.editCasoUso(casoUso);
    this.router.navigate(['/casosDeUso']);
  }
  onCancel() {
    this.casoServ.casoSeleccionado = new CasoUso();
    this.router.navigate(['/casosDeUso']);
  }

  openModal(listaSelecionada: string ) {
    this.listaSelecionada = listaSelecionada ;
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  eliminar(item, lista: string) {
   if(lista == 'alternativo'){
    let aux = [];
    let ia3 = this.listaEventosAlternativos.indexOf(item);
    for (let index = 0; index < this.listaEventosAlternativos.length; index++) {
      if (index != ia3) {
        aux.push(this.listaEventosAlternativos[index]);
      }
    }
    this.listaEventosAlternativos = aux;
   }else{
    let aux = [];
    let ia3 = this.listaEventosPrincipales.indexOf(item);
    for (let index = 0; index < this.listaEventosPrincipales.length; index++) {
      if (index != ia3) {
        aux.push(this.listaEventosPrincipales[index]);
      }
    }
    this.listaEventosPrincipales = aux;
   }
  }
  editar(item) {
    this.actividadSelecionada = item;
    this.eventosAccionSeleccionada = [];
    item.eventos.forEach(item => {
      this.eventosAccionSeleccionada.push(item);
    });
    this.modalActions2.emit({ action: "modal", params: ['open'] });
  }
  agregarActividad(lista? : string) {
    if(lista== this.listaSelecionada){
      this.listaEventosPrincipales.push(new Actividades(this.selecionado, []));
    }else{
      this.listaEventosAlternativos.push(new Actividades(this.selecionado, []));
    }
    this.selecionado = undefined ;
    
  }
  modificarEventos() {
    document.getElementById("desbloquear").style.display = "inline";
    document.getElementById("bloqueado").style.display = "none";
    if (this.eventoForm.value.descripcion != undefined && !this.eventoForm.invalid) {
      let eventos = new Evento();
      eventos.descripcion = this.eventoForm.value.descripcion;
      eventos.actor = this.eventoForm.get('actor').value;
      eventos.grupoDeDatos = this.eventoForm.value.grupoDatos;
      if(this.indiceSelecionado ==undefined){
        this.eventosAccionSeleccionada.push(eventos);
      }else{
        this.eventosAccionSeleccionada[this.indiceSelecionado] = (eventos);
        this.indiceSelecionado = undefined  ;
      }  
      
    }
    this.eventoForm.reset();
    this.actividadSelecionada.eventos = this.eventosAccionSeleccionada;
  }
  cancel() {
    document.getElementById("desbloquear").style.display = "inline";
    document.getElementById("bloqueado").style.display = "none";
    this.modalActions2.emit({ action: "modal", params: ['close'] });
  }
  desbloquear() {
    document.getElementById("desbloquear").style.display = "none";
    document.getElementById("bloqueado").style.display = "inline";
  }
  agregarEvento() {

    let eventos = new Evento();
    eventos.descripcion = this.eventoForm.value.descripcion;
    eventos.actor = this.eventoForm.get('actor').value;
    eventos.grupoDeDatos = this.eventoForm.value.grupoDatos;
    if(this.indiceSelecionado ==undefined){
      this.eventosAccionSeleccionada.push(eventos);
    }else{
      this.eventosAccionSeleccionada[this.indiceSelecionado] = (eventos);
      this.indiceSelecionado = undefined  ;
    }
 
    this.eventoForm.reset();
  }
  eliminarEvento(evento: Evento) {
    let aux = [];
    let ia3 = this.eventosAccionSeleccionada.indexOf(evento);
    for (let index = 0; index < this.eventosAccionSeleccionada.length; index++) {
      if (index != ia3) {
        aux.push(this.eventosAccionSeleccionada[index]);
      }
    }
    this.eventosAccionSeleccionada = aux;
  }
  editarEvento(evento: Evento) {
    this.indiceSelecionado = this.eventosAccionSeleccionada.indexOf(evento);
    this.eventoForm.controls['descripcion'].patchValue(evento.descripcion);
    this.eventoForm.controls['actor'].patchValue(evento.actor);
    this.eventoForm.controls['grupoDatos'].patchValue(evento.grupoDeDatos);
    document.getElementById("desbloquear").style.display = "none";
    document.getElementById("bloqueado").style.display = "inline";
  }
}
