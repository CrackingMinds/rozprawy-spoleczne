import { Component, OnInit, Type, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { firstFalse } from 'app/shared/custom.operators';

import * as indexingInfoSelectors from 'app/admin/pages/indexing/store/selectors/indexing.selectors';
import { IndexingState } from 'app/admin/pages/indexing/store/reducers/indexing.reducer';

import {
  AddIndexingInfoItemAction, ChangeOrderAction,
  LoadIndexingInfoAction,
  RemoveIndexingInfoItemAction, ResetIndexingStateAction,
  UpdateIndexingInfoItemAction
} from 'app/admin/pages/indexing/store/actions/indexing.actions';

import { IndexingInfo, IndexingInfoItem, NewIndexingInfoItem, RawIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

import {
  ListOfControlsControl, ListOfControlsOrderChange,
  ListOfControlsValueCreate,
  ListOfControlsValueRemove,
  ListOfControlsValueUpdate
} from 'app/shared/form-controls/list-of-controls/list.of.controls';

import { IndexingInfoItemControlComponent } from 'app/shared/form-controls/indexing-info-item/indexing.info.item.control.component';

import { AdminPageComponent } from 'app/admin/pages/admin.page.component';
import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';

@Component({
	selector: 'rs-indexing-edit',
	templateUrl: `indexing.edit.component.html`,
  styleUrls: ['./indexing.edit.component.scss']
})
export class IndexingEditComponent extends AdminPageComponent implements OnInit, OnDestroy {

  readonly contentLoading$: Subject<boolean> = new Subject<boolean>();

  readonly control: Type<ListOfControlsControl> = IndexingInfoItemControlComponent;

  readonly form: FormGroup = this.formBuilder.group({
    indexingInfoItemsArray: [
      null,
      Validators.required
    ]
  });

  get indexingInfoItemsArray(): FormArray {
    return this.form.get('indexingInfoItemsArray') as FormArray;
  }

  private indexingInfo: IndexingInfo;

  private readonly destroy$: Subject<void> = new Subject<void>();

	constructor(private formBuilder: FormBuilder,
              private store: Store<IndexingState>) { super(); }

	ngOnInit() {
	  this.store.select(indexingInfoSelectors.getIndexingInfoLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading: boolean) => this.contentLoading$.next(loading));

	  this.store.select(indexingInfoSelectors.getIndexingInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe((indexingInfo: IndexingInfo) => {
        this.indexingInfo = indexingInfo;
        this.setFormValue(this.indexingInfo);
      });

	  this.store.dispatch(new LoadIndexingInfoAction());
	}

	ngOnDestroy() {
	  this.destroy$.next();
	  this.destroy$.complete();

	  this.resetState();
  }

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.indexing().title);
  }

  observePageLoaded(): Observable<void> {
    return this.contentLoading$.asObservable().pipe(firstFalse());
  }

	onItemCreate(event: ListOfControlsValueCreate<RawIndexingInfoItem>): void {
    const newIndexingInfoItem: NewIndexingInfoItem = {
      ...event.controlValue,
      nextId: event.nextId
    };

    this.store.dispatch(new AddIndexingInfoItemAction({ newIndexingInfoItem: newIndexingInfoItem }));
  }

  onItemUpdate(event: ListOfControlsValueUpdate<UpdatedIndexingInfoItem>): void {
    const item = this.getIndexingInfoItemByIndex(event.controlIndex);
    const updatedItemData = event.controlValue;

    const updatedIndexingInfoItem: UpdatedIndexingInfoItem = {
      ...item,
      ...updatedItemData
    };

    this.store.dispatch(new UpdateIndexingInfoItemAction({ updatedIndexingInfoItem: updatedIndexingInfoItem }));
  }

  onItemRemove(event: ListOfControlsValueRemove): void {
	  const item = this.getIndexingInfoItemByIndex(event.indexOfControlToRemove);
	  this.store.dispatch(new RemoveIndexingInfoItemAction({
      indexingInfoItemId: item.id,
      orderChanges: event.orderChanges
	  }));
  }

  onOrderChange(event: ListOfControlsOrderChange): void {
	  this.store.dispatch(new ChangeOrderAction( { orderChanges: event }));
  }

  private setFormValue(value: IndexingInfo): void {
	  this.indexingInfoItemsArray.setValue(value);
  }

  private getIndexingInfoItemByIndex(index: number): IndexingInfoItem {
    return this.indexingInfo[index];
  }

  private resetState(): void {
	  this.store.dispatch(new ResetIndexingStateAction());
  }

}
