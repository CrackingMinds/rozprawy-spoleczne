import { Component, OnInit, Type } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { firstFalse } from 'app/shared/custom.operators';

import * as scientificBoardSelectors from 'app/admin/pages/scientific-board/store/selectors/scientific.board.selectors';
import { ScientificBoardState } from 'app/admin/pages/scientific-board/store/reducers/scientific.board.reducer';

import {
  ListOfControlsControl, ListOfControlsOrderChange,
  ListOfControlsValueCreate,
  ListOfControlsValueRemove,
  ListOfControlsValueUpdate
} from 'app/shared/form-controls/list-of-controls/list.of.controls';

import { ScientificBoardMemberControlComponent } from 'app/shared/form-controls/scientific-board-member/scientific.board.member.control.component';
import { AdminPageComponent } from 'app/admin/pages/admin.page.component';
import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';
import { ScientificBoard } from 'app/models/scientific.board';
import { NewScientificBoardMember, ScientificBoardMember, UpdatedScientificBoardMember } from 'app/models/scientific-board-member';
import {
  AddScientificBoardMember, ChangeOrderAction, LoadScientificBoard,
  RemoveScientificBoardMember, ResetScientificBoardAction,
  UpdateScientificBoardMember
} from 'app/admin/pages/scientific-board/store/actions/scientific.board.actions';

@Component({
	selector: 'rs-scientific-board-edit',
	templateUrl: `scientific.board.edit.component.html`,
  styleUrls: ['./scientific.board.edit.component.scss']
})
export class ScientificBoardEditComponent extends AdminPageComponent implements OnInit {

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

  readonly contentLoading$: Subject<boolean> = new Subject();

  private scientificBoard: ScientificBoard;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private store: Store<ScientificBoardState>) { super(); }

	ngOnInit() {
    this.initSpinnerManager();

    this.store.select(scientificBoardSelectors.getScientificBoard)
      .pipe(takeUntil(this.destroy$))
      .subscribe((scientificBoard: ScientificBoard) => {
        this.scientificBoard = scientificBoard;
        this.setFormValue(this.scientificBoard);
      });

    this.store.dispatch(new LoadScientificBoard());
	}

	ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.resetState();
  }

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.scientificBoard().title);
  }

  observePageLoaded(): Observable<void> {
    return this.contentLoading$.asObservable().pipe(firstFalse());
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
      nextId: event.nextId
    };
	  this.store.dispatch(new AddScientificBoardMember(newMemberData));
  }

  onMemberRemove(event: ListOfControlsValueRemove): void {
	  const member = this.getMemberByIndex(event.indexOfControlToRemove);
	  this.store.dispatch(new RemoveScientificBoardMember({ memberId: member.id, orderChanges: event.orderChanges }));
  }

  onOrderChange(event: ListOfControlsOrderChange): void {
    this.store.dispatch(new ChangeOrderAction({ orderChanges: event }));
  }

  private initSpinnerManager(): void {
    this.store.select(scientificBoardSelectors.getScientificBoardLoading)
        .pipe(takeUntil(this.destroy$))
        .subscribe((loading: boolean) => this.contentLoading$.next(loading));
  }

  private setFormValue(value: ScientificBoard): void {
    this.scientificBoardMembers.setValue(value);
  }

  private getMemberByIndex(index: number): ScientificBoardMember {
	  return this.scientificBoard[index];
  }

  private resetState(): void {
    this.store.dispatch(new ResetScientificBoardAction());
  }

}
