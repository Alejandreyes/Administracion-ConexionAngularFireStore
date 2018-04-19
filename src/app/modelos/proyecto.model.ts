import { CasoUso } from "./casouso.model";
export class Proyecto {
  public id: string;
  public nombre: string;
  public Descripcion : string ;
  public cliente : string ;
  public fecha_inicio : Date ;
  public fecha_fin : Date ;
  public casos : CasoUso[] ; 

  constructor (){}

}
