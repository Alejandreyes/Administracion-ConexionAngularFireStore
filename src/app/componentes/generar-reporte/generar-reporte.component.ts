import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';
import { CasosUsoService } from '../../servicios/casos-uso.service';
import { Router } from '@angular/router';

import { toast } from 'angular2-materialize';
import { CasoUso } from '../../modelos/casouso.model';
declare var jsPDF;
@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css']
})
export class GenerarReporteComponent implements OnInit {
  diagramaImg: any;
  diagram;
  casoUso: CasoUso;
  constructor(private casoServ: CasosUsoService,
    public router: Router) {
  }
  /**
   * Configuracion de Contruccion de la grafica
   * 
   */
  ngOnInit(): void {

    // Inicia Caso de Uso 
    this.iniciaCasoUso();

    let $ = go.GraphObject.make;
    // Configuracion mas basica para que funcione el diagramador
    // this.diagram = //new go.Diagram("myDiagramDiv");
    // Funcion avanzada para colocar el diagrama en el centro. Ya teniendo esto entonces podemos continuar
    this.diagram =
      $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
          initialContentAlignment: go.Spot.Center,  // center the content
          "undoManager.isEnabled": false  // enable undo & redo
        });
    // define the node template
    this.diagram.nodeTemplate =
      $(go.Node, "Auto",
        new go.Binding("location", "loc"),
        {
          locationSpot: go.Spot.Center,
        },
        $(go.Shape, "RoundedRectangle",
          {
            name: "OBJSHAPE",
            fill: "white"
          }),
        $(go.TextBlock,
          {
            maxSize: new go.Size(100, NaN),
            wrap: go.TextBlock.WrapFit,
            margin: 10
          },
          new go.Binding("text", "key"))
      );
    this.diagram.groupTemplate =
      $(go.Group, "Spot",
        {
          selectionAdornmentTemplate: // adornment when a group is selected
            $(go.Adornment, "Auto",
              $(go.Shape, "Rectangle",
                { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
              $(go.Placeholder)
            ),
          toSpot: go.Spot.AllSides, // links coming into groups at any side
          toEndSegmentLength: 100, fromEndSegmentLength: 30
        },
        $(go.Panel, "Auto",
          $(go.Shape, "Rectangle",
            {
              name: "OBJSHAPE",
              parameter1: 14,
              fill: "rgba(0,255,0,0.3)"
            },
            new go.Binding("desiredSize", "ds")),
          $(go.Placeholder,
            { padding: 16 })
        ),
        $(go.TextBlock,
          {
            name: "GROUPTEXT",
            alignment: go.Spot.TopLeft,
            alignmentFocus: new go.Spot(0, 0, 4, 4),
            font: "Bold 10pt Sans-Serif"
          },
          new go.Binding("text", "key")),
      );
    // add nodes, including groups, and links to the model
    let aristas = [  // link data
    ];

    let listaAux = [];
    let listaActores = [];

    if (this.casoUso.actividadesPrincipales == undefined) {
      toast("El caso de uso Selecionado no tiene ningun Flujo de Eventos Definido", 2500);
      toast("Llene un flujo de Eventos Principal", 2500);
      toast("Seleccione otro caso de uso", 2500);
      this.router.navigate(['/casosDeUso']);
    } else {
      this.casoUso.actividadesPrincipales.forEach(element => {
        listaAux.push(element.nombre);
        if (element.eventos != undefined) {
          if (element.eventos[0].actor == "Actor" || element.eventos[0].actor == "Sistema") {
            listaActores.push(element.eventos[0].actor.trim());
          } else {
            listaActores.push("Actor");
          }
        } else {
          listaActores.push("Actor");
        }

      });
      let Datos = listaAux;
      let inicioA: number = 35;
      let inicioS: number = 35;
      let sistema = false;
      let posXA = 50;
      let posXS = 250;
      let i: number = 0;
      let indiceActores = 0;
      let vertices = [ // node data
        { key: "Start", group: "Actor", loc: new go.Point(posXA, inicioA) },
        { key: "Diagrama de Flujo de Eventos Principal", isGroup: true },
        { key: "Actor", isGroup: true, group: "Diagrama de Flujo de Eventos Principal" },
        { key: "Sistema", isGroup: true, group: "Diagrama de Flujo de Eventos Principal" }
      ];
      let ultimoAgregado: string;
      Datos.forEach(element => {
        let aux = { key: "", group: "", loc: null };
        aux.key = element;
        sistema = (listaActores[indiceActores] == "Sistema");
        if (sistema == false) {
          if (i == 0) {
            inicioA += 75;
            inicioS += 75;
            i++;
            ultimoAgregado = "Start";
          }
          aux.group = "Actor";
          aux.loc = new go.Point(posXA, inicioA);
          inicioA += 75;
        } else {
          if (i == 0) {
            inicioA += 75;
            inicioS += 75;
            i++;
            ultimoAgregado = "Start";
          }
          aux.group = "Sistema";
          aux.loc = new go.Point(posXS, inicioS);
          inicioS += 75;
        }
        vertices.push(aux);
        aristas.push({ from: ultimoAgregado, to: element });
        ultimoAgregado = element;
        if (i == Datos.length) {
          let final = { key: "Finish", group: (sistema) ? "Sistema" : "Actor", loc: null };
          final.loc = new go.Point((sistema) ? posXS : posXA, (sistema) ? inicioS : inicioA);
          vertices.push(final);
          aristas.push({ from: element, to: "Finish" });
        }
        i++;
        indiceActores++;
      });
      this.diagram.model = new go.GraphLinksModel(
        vertices, aristas
      );
      this.diagramaImg = this.diagram.makeImage();
      let src = document.getElementById("myD");
      src.appendChild(this.diagramaImg);
      document.getElementById("myDiagramDiv").style.display = "none";
    }

  }

  iniciaCasoUso() {
    this.casoUso = this.casoServ.casoSeleccionado;
  }



  descargar() {
    var columns = ["Indice", "Eventos"];
    var rows = [];

    var auxRows = this.casoUso.precondiciones;
    if (auxRows == undefined || auxRows.length == 0) {
      auxRows.push("N/A");
    }
    let indice = 0;
    auxRows.forEach(item => {
      let aux = [indice.toString()];
      aux.push(item);
      rows.push(aux);
      indice++;
    });
    var doc = new jsPDF('p', 'px');;
    var canvas = doc.canvas;
    var ctx = canvas.getContext("2d");
    var y = 20;
    ctx.font = '20px Verdana';
    let aux = "Caso de Uso : " + this.casoServ.casoSeleccionado.nombre;
    doc.text(aux, 30, 22);
    y += 20;
    aux = "Proyecto : " + this.casoServ.nombreProyecto;
    doc.text(aux, 14, y);
    y += 20;
    ctx.font = '12px Verdana';
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    let texto = "Descripcion del Caso de Uso: " + this.casoServ.casoSeleccionado.descripcion;
    var text = doc.splitTextToSize(texto, pageWidth - 35);
    text.forEach(element => {
      doc.text(element, 14, y);
      y += 12;
      if (y + 12 > height) {
        doc.addPage();
        y = 20;
      }
    });
    ctx.font = '16px Verdana';
    texto = "Actores: " + this.casoServ.casoSeleccionado.actores.toString();
    doc.text(texto, 14, y);
    y += 16;
    doc.text("Diagrama de Actividad del Flujo Principal de Eventos", 14, y);
    if (y + 300 > height) {
      doc.addPage();
      y = 20;
    }
    doc.addImage(this.diagramaImg, 'JPEG', 10, y, 300, 300);
    y += 300;
    if (y + 24 > height) {
      doc.addPage();
      y = 20;
    }
    //



    columns = ["Indice", "Actor", "Actividad", "Descripcion", "Grupo de Datos"];
    rows = [];

    let auxActividades = this.casoUso.actividadesPrincipales;
    if (auxActividades == undefined || auxRows.length == 0) {
      auxRows.push("N/A");
    }
    indice = 0;
    auxActividades.forEach(item => {
      let eventos = item.eventos;
      eventos.forEach(element => {
        let aux = [indice.toString()];
        aux.push(element.actor);
        aux.push(item.nombre);
        aux.push(element.descripcion);
        aux.push(element.grupoDeDatos);
        //Agregamos a la columna de la fila 
        rows.push(aux);
        indice++;
      });
    });
    doc.text("Tabla de Flujo de Actividades Pricipales", 14, y);
    y += 16;
    doc.autoTable(columns, rows, {
      startY: y,
      columnStyles: { text: { columnWidth: 'auto' } }
    });

    // Nueva hoja para las Precondiciones, postcondiciones y condiciones Iniciales 
    doc.addPage();
    y = 20;
    ctx.font = '16px Verdana';
    
    doc.text("Tabla de Precondiciones", 14, y);
    y += 16;
    columns = ["Indice", "Precondiciones"];
    rows = [];

    auxRows = this.casoUso.precondiciones;
    if (auxRows == undefined || auxRows.length == 0) {
      auxRows.push("N/A");
    }
    indice = 0;
    auxRows.forEach(item => {
      let aux = [indice.toString()];
      aux.push(item);
      rows.push(aux);
      indice++;
    });
    doc.autoTable(columns, rows, {
      startY: y,
      columnStyles: { text: { columnWidth: 'auto' } }
    });
    y = doc.autoTable.previous.finalY + 10;
    ctx.font = '16px Verdana';
    if (y + 50 > height) {
      doc.addPage();
      y = 20;
    }

    doc.text("Tabla de PostCondiciones", 14, y);
    y += 16;
    columns = ["Indice", "PostCondiciones"];
    rows = [];

    auxRows = this.casoUso.postcondiciones;
    if (auxRows == undefined || auxRows.length == 0) {
      auxRows.push("N/A");
    }
    indice = 0;
    auxRows.forEach(item => {
      let aux = [indice.toString()];
      aux.push(item);
      rows.push(aux);
      indice++;
    });
    doc.autoTable(columns, rows, {
      startY: y,
      columnStyles: { text: { columnWidth: 'auto' } }
    });
    y = doc.autoTable.previous.finalY + 10;
    ctx.font = '16px Verdana';
    doc.text("Tabla de Requisistos Especiales", 14, y);
    y += 16;
    columns = ["Indice", "Requisistos Especiales"];
    rows = [];

    auxRows = this.casoUso.requisitosEspeciales;
    if (auxRows == undefined || auxRows.length == 0) {
      auxRows.push("N/A");
    }
    indice = 0;
    auxRows.forEach(item => {
      let aux = [indice.toString()];
      aux.push(item);
      rows.push(aux);
      indice++;
    });
    doc.autoTable(columns, rows, {
      startY: y,
      columnStyles: { text: { columnWidth: 'auto' } }
    });

    doc.save('Reporte.pdf');
  }
}
