import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
        firstName: [undefined, Validators.required],
        lastName: [undefined, Validators.required],
        middleName: undefined
      })
    );
  }

  removeAuthor(index: number): void {
    this.authorsArray.removeAt(index);
  }
}
