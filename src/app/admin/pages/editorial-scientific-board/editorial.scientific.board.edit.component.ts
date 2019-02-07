import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { EditorialBoardMember } from 'app/models/editorial-board-member';

import { ListOfControlsControl } from 'app/shared/form-controls/list-of-controls/list.of.controls';
import { EditorialBoardMemberControlComponent } from 'app/shared/form-controls/editorial-board-member/editorial.board.member.control.component';

@Component({
	selector: 'rs-editorial-scientific-board-edit',
	templateUrl: `editorial.scientific.board.edit.component.html`,
  styleUrls: ['./editorial.scientific.board.edit.component.scss']
})
export class EditorialScientificBoardEditComponent implements OnInit, OnDestroy {

  control: Type<ListOfControlsControl> = EditorialBoardMemberControlComponent;

  form: FormGroup = this.formBuilder.group({
    editorialBoardMembers: [
      null,
      Validators.required
    ]
  });

  get editorialBoardMembers(): FormArray {
    return this.form.get('editorialBoardMembers') as FormArray;
  }

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {

    const initialData: Array<EditorialBoardMember> = [
        {
          firstName: 'test',
          lastName: 'test-last',
          position: 'test-position',
          id: null
        },
        {
          firstName: 'test2',
          lastName: 'test2-last',
          position: 'test2-position',
          id: null
        },
        {
          firstName: 'test3',
          lastName: 'test3-last',
          position: 'test3-position',
          id: null
        }
    ];

    this.editorialBoardMembers.setValue(initialData);

	}

	ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
