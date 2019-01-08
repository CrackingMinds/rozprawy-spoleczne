import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

const nameRegExp: RegExp = new RegExp(/^([^\u0000-\u007F]|[a-zA-Z])+$/);

@Component({
  selector: 'rs-add-authors',
  templateUrl: './add.authors.component.html',
  styleUrls: ['./add.authors.component.scss']
})
export class AddAuthorsComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  authorsArray = this.formBuilder.array([]);

  get authors() {
    return this.authorsArray.controls;
  }

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.addAuthor();
    this.parentForm.addControl('authors', this.authorsArray);
  }

  addAuthor(): void {
    this.authorsArray.push(
      this.formBuilder.group({
        firstName: [undefined, [
          Validators.required,
          Validators.pattern(nameRegExp)
        ]],
        lastName: [undefined, [
          Validators.required,
          Validators.pattern(nameRegExp)
        ]],
        middleName: [undefined, [
          Validators.pattern(nameRegExp)
        ]]
      })
    );
  }

  removeAuthor(index: number): void {
    this.authorsArray.removeAt(index);
  }
}
