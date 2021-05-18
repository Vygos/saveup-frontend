import { Ganho } from "./ganho.model";

export class Financa {
    id: number;
    vlBase: number;
    vlMargem: number;
    periodo: string | Date;
    ganho: Ganho[];
    
}