import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { Subject, Observable, of } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { firstFalse } from 'app/shared/custom.operators';

import * as editorialBoardSelectors from 'app/admin/pages/editorial-board/store/selectors/editorial.board.selectors';
import { EditorialBoardState } from 'app/admin/pages/editorial-board/store/reducers/editorial.board.reducer';

import {
  AddEditorialBoardMember,
  LoadEditorialBoard,
  RemoveEditorialBoardMember, ResetEditorialBoardStateAction,
  UpdateEditorialBoardMember
} from 'app/admin/pages/editorial-board/store/actions/editorial.board.actions';

import {
  ListOfControlsControl,
  ListOfControlsValueCreate,
  ListOfControlsValueRemove,
  ListOfControlsValueUpdate
} from 'app/shared/form-controls/list-of-controls/list.of.controls';
import { EditorialBoardMemberControlComponent } from 'app/shared/form-controls/editorial-board-member/editorial.board.member.control.component';
import { EditorialBoard } from 'app/models/editorial.board';
import { EditorialBoardMember, NewEditorialBoardMember, UpdatedEditorialBoardMember } from 'app/models/editorial-board-member';
import { AdminPageComponent } from 'app/admin/pages/admin.page.component';
import { CustomSorting } from 'app/shared/custom.sorting';
import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';

@Component({
	selector: 'rs-editorial-board-edit',
	templateUrl: `editorial.board.edit.component.html`,
  styleUrls: ['./editorial.board.edit.component.scss']
})
export class EditorialBoardEditComponent extends AdminPageComponent implements OnInit, OnDestroy {

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

  readonly contentLoading$: Subject<boolean> = new Subject<boolean>();

  private editorialBoard: EditorialBoard;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private store: Store<EditorialBoardState>) { super(); }

	ngOnInit() {
    this.store.select(editorialBoardSelectors.getEditorialBoardLoading)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((loading: boolean) => this.contentLoading$.next(loading));

    this.store.select(editorialBoardSelectors.getEditorialBoard)
        .pipe(
          map((editorialBoard: EditorialBoard) => editorialBoard.sort(CustomSorting.byCustomOrder)),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((editorialBoard: EditorialBoard) => {
          this.editorialBoard = editorialBoard;
          this.setFormValue(this.editorialBoard);
        });

    this.store.dispatch(new LoadEditorialBoard());
	}

	ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.resetState();
  }

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.editorialBoard().title);
  }

  observePageLoaded(): Observable<void> {
    return this.contentLoading$.asObservable().pipe(firstFalse());
  }

  onEditorialBoardMemberUpdate(event: ListOfControlsValueUpdate<UpdatedEditorialBoardMember>): void {

    const member = this.getMemberByIndex(event.controlIndex);
    const newMemberData = event.controlValue;

    const updatedMember = {
      ...member,
      ...newMemberData
    };

    this.store.dispatch(new UpdateEditorialBoardMember(updatedMember));

  }

  onEditorialBoardMemberCreate(event: ListOfControlsValueCreate<NewEditorialBoardMember>): void {

    const newMemberData: NewEditorialBoardMember = {
      ...event.controlValue,
      index: event.controlIndex
    };

    this.store.dispatch(new AddEditorialBoardMember(newMemberData));

  }

  onEditorialBoardMemberRemove(event: ListOfControlsValueRemove): void {

    const member = this.getMemberByIndex(event.indexOfControlToRemove);

    this.store.dispatch(new RemoveEditorialBoardMember(member.id));

  }

  private setFormValue(value: EditorialBoard): void {
    this.editorialBoardMembers.setValue(value);
  }

  private getMemberByIndex(index: number): EditorialBoardMember {
    return this.editorialBoard[index];
  }

  private resetState(): void {
    this.store.dispatch(new ResetEditorialBoardStateAction());
  }

}
