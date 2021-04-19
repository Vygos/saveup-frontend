import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Page } from 'src/app/models/page.model';
import { TipoGanho } from 'src/app/models/tipo-ganho.model';
import { TipoGanhoService } from 'src/app/service/tipo-ganho.service';
import {
  NovoCadastroComponent,
  NovoCadastroModal,
} from '../novo-cadastro/novo-cadastro.component';

@Component({
  selector: 'app-tipo-ganho',
  templateUrl: './tipo-ganho.component.html',
  styleUrls: ['./tipo-ganho.component.scss'],
})
export class TipoGanhoComponent implements OnInit {
  isLoading: boolean = true;

  columnsToDisplay = ['nome', 'ação'];

  page: Page<TipoGanho> = new Page({ number: 0, size: 10 });

  data: TipoGanho[] = [];

  constructor(
    private dialog: MatDialog,
    private tipoGanhoService: TipoGanhoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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
        this.tipoGanhoService
          .salvar(ref.tipoGanho)
          .subscribe(
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

  onPageChanges(page: PageEvent) {
    console.log('page');
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
}
