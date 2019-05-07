import { Component, OnInit, Type, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as indexingInfoSelectors from 'app/admin/pages/indexing/store/selectors/indexing.selectors';
import { IndexingState } from 'app/admin/pages/indexing/store/reducers/indexing.reducer';

import {
  AddIndexingInfoItemAction,
  LoadIndexingInfoAction,
  RemoveIndexingInfoItemAction,
  UpdateIndexingInfoItemAction
} from 'app/admin/pages/indexing/store/actions/indexing.actions';

import { IndexingInfo, IndexingInfoItem, NewIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

import {
  ListOfControlsControl,
  ListOfControlsValueCreate,
  ListOfControlsValueRemove,
  ListOfControlsValueUpdate
} from 'app/shared/form-controls/list-of-controls/list.of.controls';

import { IndexingInfoItemControlComponent } from 'app/shared/form-controls/indexing-info-item/indexing.info.item.control.component';

import { PageComponent } from 'app/client/pages/page.component';
import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';
import { CustomSorting } from 'app/shared/custom.sorting';

@Component({
	selector: 'rs-indexing-edit',
	templateUrl: `indexing.edit.component.html`,
  styleUrls: ['./indexing.edit.component.scss']
})
export class IndexingEditComponent implements PageComponent, OnInit, OnDestroy {

  contentLoading: boolean = false;

  readonly control: Type<ListOfControlsControl> = IndexingInfoItemControlComponent;;

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
              private store: Store<IndexingState>) {}

	ngOnInit() {
	  this.store.select(indexingInfoSelectors.getIndexingInfoLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading: boolean) => this.contentLoading = loading);

	  this.store.select(indexingInfoSelectors.getIndexingInfo)
      .pipe(
        map((indexingInfo: IndexingInfo) => [...indexingInfo].sort(CustomSorting.byCustomOrder)),
        takeUntil(this.destroy$)
      )
      .subscribe((indexingInfo: IndexingInfo) => {
        this.indexingInfo = indexingInfo;
        this.setFormValue(this.indexingInfo);
      });

	  this.store.dispatch(new LoadIndexingInfoAction());
	}

	ngOnDestroy() {
	  this.destroy$.next();
	  this.destroy$.complete();
  }

  observeContentLoading(): Observable<boolean> {
    return of(false);
  }

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.indexing().title);
  }

	onItemCreate(event: ListOfControlsValueCreate<NewIndexingInfoItem>): void {
    const newIndexingInfoItem: NewIndexingInfoItem = {
      ...event.controlValue,
      index: event.controlIndex
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
	  const item = this.getIndexingInfoItemByIndex(event.controlIndex);
	  this.store.dispatch(new RemoveIndexingInfoItemAction({ indexingInfoItemId: item.id }));
  }

  private setFormValue(value: IndexingInfo): void {
	  this.indexingInfoItemsArray.setValue(value);
  }

  private getIndexingInfoItemByIndex(index: number): IndexingInfoItem {
    return this.indexingInfo[index];
  }

}
