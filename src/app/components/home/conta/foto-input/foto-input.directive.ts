import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ngFotoInput]'
})
export class FotoInputDirective {

  constructor(private ngControl: NgControl, private elementRef: ElementRef) { }


  ngOnInit(): void {
    console.log("elementRef", this.elementRef);

    this.elementRef.nativeElement.style.borderRadius = '50px'
    this.elementRef.nativeElement.style.width = '50%'
    this.elementRef.nativeElement.style.heigth = '50%'
  }

}
