import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner-loading',
  template: `
    <div class="spinner-outside">
      <div class="spinner">
        <mat-spinner [diameter]="diameter" ></mat-spinner>,
      </div>
    </div>
  `,
  styleUrls: ['./spinner-loading.component.scss']
})
export class SpinnerLoadingComponent implements OnInit {

  @Input() diameter: number = 50;

  @Input() indeterminate;

  constructor() {

  }

  ngOnInit(): void {
  }

}
