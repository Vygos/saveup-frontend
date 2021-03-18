import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  private _errorMsg: {[key: string]: string }= {
    required: "Campo de preenchimento obrigatório",
    minlength: 'Tamanho minímo de 6 caracteres',
    email: 'Email inválido',
    emailExists: "Email já cadastrado"

  };

  constructor() { }

  get errorMsg() {
    return this._errorMsg;
  }


}
