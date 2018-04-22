import { CasoUso } from "./casouso.model";
export class Proyecto {
  public id: string;
  public nombre: string;
  public Descripcion : string ;
  public cliente : string ;
  public fechaInicio : Date ;
  public fechaFin : Date ;
  public casos : CasoUso[] ; 

  constructor (){}

}
