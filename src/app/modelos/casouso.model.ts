import { Accion } from "./accion.model";
import { Actividad } from "./actividad.model";


export class CasoUso {
  public id : string ;
  public nombre : string ;
  public descripcion : string ;
  public postcondiciones : string[] ;
  public precondiciones : string [] ;
  public flujos : string[];
  public actividadesPrincipales: Actividad[];
  public actividadesAlternativas: Actividad[];
  public requisitosEspeciales :string[];
   public eventos : string[];
  public actores : string[];

}
