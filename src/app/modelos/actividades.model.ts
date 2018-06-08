import {Evento} from './evento.model';
export class Actividades {
    public nombre: string;
    public eventos: Evento [];
    constructor(nombre : string , eventos : Evento[]){
        this.nombre = nombre ; 
        this.eventos = eventos ; 
    }

}