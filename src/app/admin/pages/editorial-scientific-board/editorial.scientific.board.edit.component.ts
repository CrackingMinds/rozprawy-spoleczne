import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { EditorialBoardMember } from 'app/models/editorial-board-member';

@Component({
	selector: 'rs-editorial-scientific-board-edit',
	templateUrl: `editorial.scientific.board.edit.component.html`,
  styleUrls: ['./editorial.scientific.board.edit.component.scss']
})
export class EditorialScientificBoardEditComponent implements OnInit, OnDestroy {

  form: FormGroup = this.formBuilder.group({
    editorialBoardMembers: this.formBuilder.array([])
  });

  get editorialBoardMembers(): FormArray {
    return this.form.get('editorialBoardMembers') as FormArray;
  }

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
    this.addEmptyEditorialBoardMemberControl();
	}

	ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

	addEmptyEditorialBoardMemberControl(): void {
    const boardMember: EditorialBoardMember = {
      id: undefined,
      position: undefined,
      firstName: undefined,
      lastName: undefined,
      middleName: undefined
    };

    this.addEditorialBoardMemberControl(boardMember);
  }

	addEditorialBoardMemberControl(boardMember: EditorialBoardMember): void {
    this.editorialBoardMembers.push(
      this.formBuilder.control(boardMember, [
        Validators.required
      ])
    );
  }

  removeEditorialBoardMember(index: number): void {
    this.editorialBoardMembers.removeAt(index);
  }

}
