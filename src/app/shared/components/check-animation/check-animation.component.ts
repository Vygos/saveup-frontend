import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'ng-check-animation',
  templateUrl: './check-animation.component.html',
  styleUrls: ['./check-animation.component.scss']
})
export class CheckAnimationComponent implements OnInit {


  @Input() event: Observable<any>

  constructor() { }

  ngOnInit(): void {

    // this.event.subscribe(() => {
    //   const element = document.getElementById('check-icon');
    //   element.style.display = "none";
      
    //   setTimeout(() => {
    //     element.style.display = "block";
    //   }, 100);
    // })
  }

}
