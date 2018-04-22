import { CasoUso } from "./casouso.model";
export class Proyecto {
  public id: string;
  public nombre: string;
  public Descripcion : string ;
  public cliente : string ;
  public fechaInicio : string ;
  public fechaFin : string ;
  public casos : CasoUso[] ; 

  constructor (){}

}
