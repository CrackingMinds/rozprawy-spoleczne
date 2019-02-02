import { Directive, OnInit, ComponentRef, Input, Type, ViewContainerRef, ComponentFactoryResolver, Injector, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

import { ListOfControlsControl, ListOfControlsData } from 'app/shared/form-controls/list-of-controls/list.of.controls';

@Directive({
	selector: '[rs-control-factory]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ListControlComponentFactory,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ListControlComponentFactory,
      multi: true
    }
  ]
})
export class ListControlComponentFactory implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  @Input()
  control: Type<ListOfControlsControl>;

  @Input('data')
  controlData: ListOfControlsData;

  private componentRef: ComponentRef<ListOfControlsControl>;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private injector: Injector) {

	}

	ngOnInit() {
    this.createControlComponent();
    this.attachControlComponent();
	}

	ngOnDestroy() {
	  this.componentRef.destroy();
	  this.componentRef = null;
  }

  registerOnChange(fn: any): void {
	  this.componentRef.instance.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.componentRef.instance.registerOnTouched(fn);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.componentRef.instance.registerOnValidatorChange(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.componentRef.instance.setDisabledState(isDisabled);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.componentRef.instance.validate(control);
  }

  writeValue(obj: any): void {
    this.componentRef.instance.writeValue(obj);
  }

  private createControlComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.control);
    this.componentRef = componentFactory.create(this.injector);
  }

  private attachControlComponent(): void {
    this.viewContainerRef.insert(this.componentRef.hostView);
    this.componentRef.changeDetectorRef.detectChanges();
  }

}
