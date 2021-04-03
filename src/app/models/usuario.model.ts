export class Usuario {
    id: number;
    nome?: string;
    email?: string;
    secret?: string;
    cpf?: string;
    vlRenda?: string;
    foto?: string;
    dtNascimento?: string | Date;
    dtCadastro?: string | Date;
    fotoBase64?: string;
}