import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'foto-input',
  templateUrl: './foto-input.component.html',
  styleUrls: ['./foto-input.component.scss'],
})
export class FotoInputComponent implements OnInit {
  fileChoosen: File;
  fileChoosenBase64: string;
  _foto: FormControl;

  constructor() {}

  ngOnInit(): void {}

  @Input() show: boolean;

  @Input()
  set foto(foto: FormControl) {
    this._foto = foto;
    if (foto && foto.value) {
      this.fileChoosenBase64 = `data:image/jpeg;base64,${foto.value}`;
    }
  }

  get foto() {
    return this._foto;
  }

  open() {
    document.getElementById('inputFoto').click();
  }

  async getFile(files: File[]) {
    this._foto.setValue(files[0]);
    this.fileChoosenBase64 = (await this.toBase64(files[0])) as string;
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
