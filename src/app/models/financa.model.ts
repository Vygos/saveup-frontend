import { Despesa } from "./despesa.model";
import { Ganho } from "./ganho.model";
import { Usuario } from "./usuario.model";

export class Financa {
    id: number;
    vlBase: number;
    vlMargem: number;
    periodo: string | Date;
    ganhos: Ganho[];
    despesas: Despesa[];
    usuario: Usuario;
}