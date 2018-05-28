import { Accion } from './accion.model';

export class Evento {
    public id : string;
    public actor : string;
    public grupoDeDatos: string;
    public descripcion: string;
    public actividad: string;
    public posicion: number;
}