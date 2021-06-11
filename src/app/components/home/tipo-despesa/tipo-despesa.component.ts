import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Page } from 'src/app/models/page.model';
import { TipoDespesa } from 'src/app/models/tipo-despesa.model';
import { TipoDespesaService } from 'src/app/service/tipo-despesa.service';
import { NovoCadastroComponent } from './novo-cadastro/novo-cadastro.component';
import { UpdateTipoDespesaComponent } from './update-tipo-despesa/update-tipo-despesa.component';

@Component({
  selector: 'app-tipo-despesa',
  templateUrl: './tipo-despesa.component.html',
  styleUrls: ['./tipo-despesa.component.scss'],
})
export class TipoDespesaComponent implements OnInit {
  form: FormGroup;

  isLoading = false;

  page: Page<TipoDespesa> = new Page({ number: 0, size: 5 });

  displayedColumns: string[] = ['nome', 'ação'];

  constructor(
    private tipoDespesaService: TipoDespesaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null]
    });

    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.tipoDespesaService
      .findAll(this.page)
      .subscribe((page) => {
        this.page = page;
        this.isLoading = false;
      }, console.log);
  }

  onPageChanges(page: PageEvent) {
    this.page.number = page.pageIndex;
    this.page.size = page.pageSize;
    this.load();
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  delete(dialogRef: MatDialogRef<any>, tipo: TipoDespesa) {
    dialogRef.close();

    this.tipoDespesaService
      .deleteById(tipo.id)
      .subscribe(() => {
        this.showSnackBar('Ação realizada com sucesso');
        this.load();
      }, () => this.showSnackBar('Não foi possível deletar tipo despesa'));
  }

  adicionar() {
    const novoTipoDespesaRef = this.dialog.open(NovoCadastroComponent, {
      width: '500px'
    });

    novoTipoDespesaRef.componentInstance.onClose.subscribe(({tipoDespesa, dialogRef}) => {
      dialogRef.close();

      this.tipoDespesaService.salvar(tipoDespesa.nome)
        .subscribe(() => {
          this.showSnackBar('Cadastrado com sucesso');
          this.load();
        }, () => this.showSnackBar('Não foi possível cadastrar'));
    });
  }

  editar(tipoDespesa: TipoDespesa) {
    const updateTipoDespesaRef = this.dialog.open(UpdateTipoDespesaComponent, {
      width: '250px',
      data: { tipoDespesa },
    });
    updateTipoDespesaRef.componentInstance.onClose.subscribe(
      ({ updatedTipoDespesa, dialogRef}) => {
        dialogRef.close();

        this.tipoDespesaService
          .atualizarById(updatedTipoDespesa)
          .subscribe(() => {
            this.showSnackBar('Ação realizada com sucesso');
            this.load();
          }, () => this.showSnackBar('Não foi possível editar o tipo despesa'));
      },
      console.log
    );
  }

  pesquisar() {
    const { nome } = this.form.value;
    this.isLoading = true;
    this.tipoDespesaService.findAll(this.page, nome)
      .subscribe(page => this.page = page,
        () => this.showSnackBar('Não foi possivel carregar os dados')
      )
      .add(() => this.isLoading = false);
  }
}
