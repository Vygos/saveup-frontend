import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  private _errorMsg: {[key: string]: string }= {
    required: "Campo de preenchimento obrigatório" 
  };

  constructor() { }

  get errorMsg() {
    return this._errorMsg;
  }


}
