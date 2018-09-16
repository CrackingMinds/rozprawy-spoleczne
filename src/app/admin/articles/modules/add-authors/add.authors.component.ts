import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Author } from 'app/models/author';

@Component({
  selector: 'rs-add-authors',
  templateUrl: './add.authors.component.html',
  styleUrls: ['./add.authors.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AddAuthorsComponent,
    multi: true
  }]
})
export class AddAuthorsComponent implements ControlValueAccessor, OnInit {

  private authors: Author[] = [];

  ngOnInit() {
    this.addEmptyAuthor();
  }

  addAnotherAuthor(): boolean {
    this.addEmptyAuthor();
    return false;
  }

  removeAuthor(author: Author): boolean {
    const index = this.authors.indexOf(author);
    if (index > -1) {
      this.authors.splice(index, 1);
    }
    return false;
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: Author[]): void {
    this.authors = value;
  }

  private addEmptyAuthor(): void {
    this.authors.push(
      {
        id: '',
        firstName: '',
        middleName: '',
        lastName: ''
      }
    );
  }
}
