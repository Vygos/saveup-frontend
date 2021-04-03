import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotoAtualizarService {

  private _fotoBase64: Subject<string> = new Subject();

  constructor() { }


  get fotoBase64 () {
    return this._fotoBase64;
  }



}
