import { Accion } from './accion.model';

export class Evento{
    public actor : string;
    public grupoDeDatos: string;
    public descripcion: string;
    public accion: Accion;
    public posicion: number;
}