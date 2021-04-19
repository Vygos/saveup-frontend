export class Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    last?: boolean;
    sort: string;

    constructor(partial: Partial<Page<T>>){
        Object.assign(this, partial);
    }
    
    
}