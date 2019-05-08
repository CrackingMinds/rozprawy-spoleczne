import { Component, OnInit, Type } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as scientificBoardSelectors from 'app/admin/pages/scientific-board/store/selectors/scientific.board.selectors';
import { ScientificBoardState } from 'app/admin/pages/scientific-board/store/reducers/scientific.board.reducer';

import {
  ListOfControlsControl,
  ListOfControlsValueCreate,
  ListOfControlsValueRemove,
  ListOfControlsValueUpdate
} from 'app/shared/form-controls/list-of-controls/list.of.controls';

import { ScientificBoardMemberControlComponent } from 'app/shared/form-controls/scientific-board-member/scientific.board.member.control.component';
import { PageComponent } from 'app/client/pages/page.component';
import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';
import { ScientificBoard } from 'app/models/scientific.board';
import { NewScientificBoardMember, ScientificBoardMember, UpdatedScientificBoardMember } from 'app/models/scientific-board-member';
import {
  AddScientificBoardMember, LoadScientificBoard,
  RemoveScientificBoardMember,
  UpdateScientificBoardMember
} from 'app/admin/pages/scientific-board/store/actions/scientific.board.actions';
import { CustomSorting } from 'app/shared/custom.sorting';

@Component({
	selector: 'rs-scientific-board-edit',
	templateUrl: `scientific.board.edit.component.html`,
  styleUrls: ['./scientific.board.edit.component.scss']
})
export class ScientificBoardEditComponent implements PageComponent, OnInit {

  contentLoading: boolean;

  control: Type<ListOfControlsControl> = ScientificBoardMemberControlComponent;

  form: FormGroup = this.formBuilder.group({
    scientificBoardMembers: [
      null,
      Validators.required
    ]
  });

  get scientificBoardMembers(): FormArray {
    return this.form.get('scientificBoardMembers') as FormArray;
  }

  private scientificBoard: ScientificBoard;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private store: Store<ScientificBoardState>) {

	}

	ngOnInit() {
    this.store.select(scientificBoardSelectors.getScientificBoardLoading)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.contentLoading = loading);

    this.store.select(scientificBoardSelectors.getScientificBoard)
      .pipe(
        map((scientificBoard: ScientificBoard) => scientificBoard.sort(CustomSorting.byCustomOrder)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((scientificBoard: ScientificBoard) => {
        this.scientificBoard = scientificBoard;
        this.setFormValue(this.scientificBoard);
      });

    this.store.dispatch(new LoadScientificBoard());
	}

	ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoading(): Observable<boolean> {
    return of(false);
  }

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.scientificBoard().title);
  }

  onMemberUpdate(event: ListOfControlsValueUpdate<UpdatedScientificBoardMember>): void {
	  const member = this.getMemberByIndex(event.controlIndex);
	  const newMemberData = event.controlValue;

	  const updatedMember = {
	    ...member,
      ...newMemberData
    };

    this.store.dispatch(new UpdateScientificBoardMember(updatedMember));
  }

  onMemberCreate(event: ListOfControlsValueCreate<NewScientificBoardMember>): void {
	  const newMemberData: NewScientificBoardMember = {
	    ...event.controlValue,
      index: event.controlIndex
    };

	  this.store.dispatch(new AddScientificBoardMember(newMemberData));
  }

  onMemberRemove(event: ListOfControlsValueRemove): void {
	  const member = this.getMemberByIndex(event.controlIndex);
	  this.store.dispatch(new RemoveScientificBoardMember(member.id));
  }

  private setFormValue(value: ScientificBoard): void {
    this.scientificBoardMembers.setValue(value);
  }

  private getMemberByIndex(index: number): ScientificBoardMember {
	  return this.scientificBoard[index];
  }

}