import { Financa } from "./financa.model";
import { TipoGanho } from "./tipo-ganho.model";

export class Ganho {
    id?: number;
    valor?: number;
    tipo?: TipoGanho
    financa?: Financa
}