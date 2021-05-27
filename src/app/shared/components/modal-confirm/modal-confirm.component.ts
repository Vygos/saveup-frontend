import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

interface Data {
  legenda: string
  onConfirm: Subject<MatDialogRef<ModalConfirmComponent>>
}

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  ngOnInit(): void {
  }

  confirm() {
    this.data.onConfirm.next(this.dialogRef);
  }
}
