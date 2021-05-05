import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ModalConfirmComponent } from './modal-confirm.component';

@Directive({
  selector: 'button[modal-confirm]',
})
export class ModalConfirmDirective {
  @Input() legenda: string = 'Você realmente deseja realizar essa ação? ';

  @Output() confirm = new EventEmitter<MatDialogRef<ModalConfirmComponent>>();

  private onConfirm = new Subject<MatDialogRef<ModalConfirmComponent>>();

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.onConfirm.subscribe(
      (dialogRef: MatDialogRef<ModalConfirmComponent>) => {
        this.confirm.emit(dialogRef);
      }
    );
  }

  @HostListener('click') onMouseClick() {
    this.matDialog.open(ModalConfirmComponent, {
      width: '400px',
      data: { legenda: this.legenda, onConfirm: this.onConfirm },
    });
  }
}
