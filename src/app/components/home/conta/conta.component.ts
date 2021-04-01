import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  form: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      foto: [''],
      nome: ['ITADORI YUUJI DA SILVA'],
      email: ['teste@gmail.com'],
      cpf: ['05487678154'],
      dtCadastro: ['18/09/1996'],
      dtNascimento: ['18/09/1996'],
      vlRenda: [10.90]
    })
  }

}
