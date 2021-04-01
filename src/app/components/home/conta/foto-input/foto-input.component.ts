import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foto-input',
  templateUrl: './foto-input.component.html',
  styleUrls: ['./foto-input.component.scss'],
})
export class FotoInputComponent implements OnInit {
  fileChoosen: File;
  fileChoosenBase64: string;

  constructor() {}

  ngOnInit(): void {}

  async getFile(files: File[]) {
    this.fileChoosenBase64 = await this.toBase64(files[0]) as string;
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
