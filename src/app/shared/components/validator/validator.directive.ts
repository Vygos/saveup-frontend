import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Inject,
  Injector,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidatorComponent } from './validator.component';

@Directive({
  selector: '[app-validate]',
})
export class ValidatorDirective {
  constructor(
    @Self() private control: NgControl,
    private ComponentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    this.appendComponentToBody();
  }

  appendComponentToBody() {
    const componentRef = this.ComponentFactoryResolver.resolveComponentFactory(
      ValidatorComponent
    ).create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.element.nativeElement.after(domElem, this.element.nativeElement.nextSibling);
    
  }
}
