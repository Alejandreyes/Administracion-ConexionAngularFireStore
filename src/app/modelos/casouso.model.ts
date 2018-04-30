import { Accion } from "./accion.model";


export class CasoUso {
  public id : string ;
  public nombre : string ;
  public descripcion : string ;
  public postcondiciones : string[] ;
  public precondiciones : string [] ;
  public flujos : string[];
  public requisitosEspeciales :string[];
   public eventos : string[];
  public actores : string[];

}
