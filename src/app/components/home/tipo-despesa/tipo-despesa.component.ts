import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/models/page.model';
import { TipoDespesa } from 'src/app/models/tipo-despesa.model';
import { TipoDespesaService } from 'src/app/service/tipo-despesa.service';
import { UpdateTipoDespesaComponent } from './update-tipo-despesa/update-tipo-despesa.component';

@Component({
  selector: 'app-tipo-despesa',
  templateUrl: './tipo-despesa.component.html',
  styleUrls: ['./tipo-despesa.component.scss'],
})
export class TipoDespesaComponent implements OnInit {
  isLoading = false;

  page: Page<TipoDespesa> = new Page({ number: 0, size: 5 });

  displayedColumns: string[] = ['nome', 'ação'];

  constructor(
    private tipoDespesaService: TipoDespesaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.tipoDespesaService
      .findAll(this.page)
      .subscribe((page) => (this.page = page), console.log)
      .add(() => (this.isLoading = false));
  }

  onPageChanges(page: PageEvent) {
    this.page.number = page.pageIndex;
    this.page.size = page.pageSize;
    this.load();
  }

  delete(dialogRef: MatDialogRef<any>, tipo: TipoDespesa) {
    dialogRef.close();

    this.tipoDespesaService
      .deleteById(tipo.id)
      .subscribe(() => this.load(), console.log);
  }

  adicionar() {
    const nome = `teste${this.genNumberRandom()}`;
    this.tipoDespesaService
      .salvar(nome)
      .subscribe(() => this.load(), console.log);
  }

  openModal(tipoDespesa: TipoDespesa) {
    const UpdateTipoDespesaRef = this.dialog.open(UpdateTipoDespesaComponent, {
      width: '250px',
      data: { tipoDespesa },
    });
    UpdateTipoDespesaRef.componentInstance.onClose.subscribe(
      ({ updatedTipoDespesa, dialogRef }) => {
        dialogRef.close();

        this.tipoDespesaService
          .atualizarById(updatedTipoDespesa)
          .subscribe(() => this.load(), console.log);
      },
      console.log
    );
  }

  genNumberRandom(): number {
    return Math.floor(Math.random() * 1000);
  }
}
