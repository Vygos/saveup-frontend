export class JWT {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: string;
    scope: string;
    jti: string
}


export class AccessToken {
    nome: string;
    id: number;
    email: string;
    exp: number;
    jti: string;
    client_id: string;
}