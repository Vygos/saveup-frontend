import { Financa } from "./financa.model";
import { TipoDespesa } from "./tipo-despesa.model";

export class Despesa {
    id?: number;
    valor?: number;
    tipo?: TipoDespesa;
    financa?: Financa;
}