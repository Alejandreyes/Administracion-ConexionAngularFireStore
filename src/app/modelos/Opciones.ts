import { Usuario } from "./usuario.model";

export class Opciones {
    usuario: Usuario;
    seleccionado: boolean;
    constructor(usuario: Usuario, seleccionado: boolean) {
        this.usuario = usuario;
        this.seleccionado = seleccionado;
    }
}