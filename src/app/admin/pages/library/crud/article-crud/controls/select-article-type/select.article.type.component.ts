import { Component, OnInit, Optional, Self, HostBinding, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { MatSelectChange, MatFormFieldControl } from '@angular/material';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { ArticleType } from 'app/models/article.type';

@Component({
  selector: 'rs-select-article-type',
  templateUrl: './select.article.type.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: SelectArticleTypeComponent
    }
  ]
})
export class SelectArticleTypeComponent implements ControlValueAccessor, MatFormFieldControl<string>, OnChanges, OnInit, OnDestroy {

  @Input()
  articleTypes: ArticleType[];

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this._stateChange$.next();
  }

  @Input()
  get required() { return this._required; }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this._stateChange$.next();
  }

  @Input()
  get disabled() { return this._disabled; }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this._stateChange$.next();
  }

  static nextId = 0;

  @HostBinding()
  id = `rs-select-article-type-${SelectArticleTypeComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() { return this.focused || !this.empty; }

  get empty(): boolean { return !this.selectedType; }

  stateChanges: Observable<void>;

  value: string;

  errorState: boolean;

  focused: boolean;

  selectedType: ArticleType;

  private _stateChange$ = new Subject<void>();
  private _required: boolean;
  private _disabled: boolean;
  private _placeholder: string;

  private touched: boolean;

  private onChange: (articleTypeId: string) => any;
  private onTouched: () => any;

  private initialArticleTypeId: string;

  constructor(@Optional() @Self() public ngControl: NgControl) {

    if (this.ngControl != null) { this.ngControl.valueAccessor = this; }

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.articleTypes && changes.articleTypes.currentValue) {
      this.selectedType = this.articleTypes.filter((articleType: ArticleType) => {
        return articleType.id === this.initialArticleTypeId;
      })[0];
    }

  }

  ngOnInit() {
    this.stateChanges = this._stateChange$.asObservable();
  }

  ngOnDestroy() {
    this._stateChange$.complete();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(articleTypeId: string): void {
    this.initialArticleTypeId = articleTypeId;
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]) {
  }

  onFocus(): void {
    this.focused = true;
    this._stateChange$.next();
  }

  onBlur(): void {
    this.focused = false;
    this._stateChange$.next();
  }

  onOpenedChange(): void {

    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }

    this.errorState = !this.ngControl.valid;
    this._stateChange$.next();
  }

  onSelectionChange(change: MatSelectChange): void {
    this.selectedType = change.value as ArticleType;
    if (this.onChange) {
      this.onChange(this.selectedType.id);
    }
  }
}
