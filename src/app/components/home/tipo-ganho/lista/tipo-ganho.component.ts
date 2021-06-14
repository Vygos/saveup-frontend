import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Page } from 'src/app/models/page.model';
import { TipoGanho } from 'src/app/models/tipo-ganho.model';
import { TipoGanhoService } from 'src/app/service/tipo-ganho.service';
import {
  NovoCadastroComponent,
  NovoCadastroModal,
} from '../novo-cadastro/novo-cadastro.component';
import { UpdateTipoGanhoComponent } from '../update-tipo-ganho/update-tipo-ganho.component';

interface Filtro {
  nome: string;
}

@Component({
  selector: 'app-tipo-ganho',
  templateUrl: './tipo-ganho.component.html',
  styleUrls: ['./tipo-ganho.component.scss'],
})
export class TipoGanhoComponent implements OnInit {
  isLoading = true;

  columnsToDisplay = ['nome', 'ação'];

  form: FormGroup;

  filtro: Filtro;

  page: Page<TipoGanho> = new Page({ number: 0, size: 5 });

  data: TipoGanho[] = [];

  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private tipoGanhoService: TipoGanhoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      nome: [null],
    });

    this.load();
  }

  load() {
    this.isLoading = true;
    this.tipoGanhoService.findAll(this.page).subscribe(
      (page) => {
        this.page = page;
        this.isLoading = false;
      },
      () => console.log('error')
    );
  }
  openModal() {
    const modal = this.dialog.open(NovoCadastroComponent, {
      width: '500px',
    });

    modal.componentInstance.onClose.subscribe(
      (ref: NovoCadastroModal<NovoCadastroComponent>) => {
        this.tipoGanhoService.salvar(ref.tipoGanho).subscribe(
          () => {
            modal.componentInstance.isLoading = false;
            ref.dialogRef.close();
            this.showSnackBar('Cadastrado com sucesso');
            this.load();
          },
          (e) => {
            modal.componentInstance.isLoading = false;
            this.showSnackBar(e.error.message);
          }
        );
      }
    );
  }

  editar(tipoGanho: TipoGanho) {
    const updateTipoGanhoRef = this.dialog.open(UpdateTipoGanhoComponent, {
      width: '250px',
      data: { tipoGanho },
    });
    updateTipoGanhoRef.componentInstance.onClose.subscribe(
      ({ updatedTipoGanho, dialogRef}) => {
        dialogRef.close();

        this.tipoGanhoService
          .atualizarById(updatedTipoGanho)
          .subscribe(() => {
            this.showSnackBar('Ação realizada com sucesso');
            this.load();
          }, () => this.showSnackBar('Não foi possível editar o tipo ganho'));
      },
    );
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

  pesquisar() {
    this.filtro = this.form.value;

    this.isLoading = true;
    this.tipoGanhoService
      .findAll(this.page, this.filtro.nome)
      .subscribe(
        (page: Page<TipoGanho>) => (this.page = page),
        (e) => this.showSnackBar('Não foi possivel carregar os dados')
      )
      .add(() => (this.isLoading = false));
  }

  delete(dialogRef: MatDialogRef<any>, tipo: TipoGanho) {
    dialogRef.close();

    this.tipoGanhoService.deleteById(tipo.id).subscribe(
      () => {
        this.showSnackBar('Ação realizada com sucesso');

        this.load();
      },
      () => this.showSnackBar('Não foi possível deletar tipo ganho')
    );
  }
}
