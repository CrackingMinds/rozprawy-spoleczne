import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { IIssue, IRawIssue } from 'app/models/issue';
import { DialogType } from 'app/base/modal/dialog.type';

import { ModalComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.component';
import { ModalData } from 'app/admin/library/list-of-issues/modals/modal/modal.data';
import { IssueCRUDModalComponent } from 'app/admin/library/list-of-issues/modals/create-issue/issue.crud.modal.component';

@Component({
  selector: 'rs-list-of-issues',
  templateUrl: './list.of.issues.component.html',
  styleUrls: ['./list.of.issues.component.scss']
})
export class ListOfIssuesComponent implements OnInit, OnDestroy {

  @Input('issues')
  issues$: Observable<IIssue[]>;

  @Output()
  issueSelect: EventEmitter<IIssue> = new EventEmitter<IIssue>();

  @Output()
  issueCreate: EventEmitter<IRawIssue> = new EventEmitter<IRawIssue>();

  @Output()
  issueEdit: EventEmitter<IIssue> = new EventEmitter<IIssue>();

  @Output()
  issueRemove: EventEmitter<IIssue> = new EventEmitter<IIssue>();

  selectedIssue: IIssue;

  dialogType = {
    CREATE_ISSUE: DialogType.CREATE_ISSUE,
    EDIT_ISSUE: DialogType.EDIT_ISSUE,
    MAKE_ISSUE_CURRENT: DialogType.MAKE_ISSUE_CURRENT,
    REMOVE_ISSUE: DialogType.REMOVE_ISSUE,
  };

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.issues$
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((issues: IIssue[]) => {
          const issueMarkedAsSelected: IIssue = issues.filter((issue: IIssue) => issue.isCurrent)[0];
          this.selectIssue(issueMarkedAsSelected);
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectIssue(issue: IIssue): void {
    if (issue === this.selectedIssue) {
      return;
    }

    this.selectedIssue = issue;
    this.issueSelect.emit(issue);
  }

  openDialog(dialogType: DialogType, issue?: IIssue): void {

    switch (dialogType) {
      case DialogType.CREATE_ISSUE: {
        this.openIssueCreationDialog();
        break;
      }

      case DialogType.EDIT_ISSUE: {
        this.openIssueEditDialog(issue);
        break;
      }

      case DialogType.MAKE_ISSUE_CURRENT: {
        this.openMakeIssueCurrentDialog(issue);
        break;
      }

      case DialogType.REMOVE_ISSUE: {
        this.openIssueRemovalDialog(issue);
        break;
      }

      default: {
        break;
      }
    }
  }

  private openIssueCreationDialog(): void {

    const modalData: ModalData = {
      title: 'Dodanie nowego numeru',
      content: IssueCRUDModalComponent,
      buttons: {
        submit: {
          text: 'Dodaj'
        }
      },
      otherParams: undefined
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });

    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((newIssue: IRawIssue) => {
               if (!newIssue) {
                 return;
               }
               this.issueCreate.emit({...newIssue});
             });
  }

  private openIssueEditDialog(issue: IIssue): void {

    const modalData: ModalData = {
      title: 'Edycja numeru',
      content: IssueCRUDModalComponent,
      buttons: {
        submit: {
          text: 'Zapisz'
        }
      },
      otherParams: issue
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });

    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((updatedIssue: IIssue) => {
               if (!updatedIssue) {
                 return;
               }
               this.issueEdit.emit({...updatedIssue});
             });
  }

  private openMakeIssueCurrentDialog(issue: IIssue): void {

    const modalData: ModalData = {
      title: undefined,
      content: 'Czy napewno chcesz zrobić ten numer bieżącym?',
      buttons: {
        submit: {
          text: 'Tak'
        }
      },
      otherParams: undefined
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });

    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((actionSubmitted: boolean) => {
               if (!actionSubmitted) {
                 return;
               }
               this.issueEdit.emit({
                 ...issue,
                 isCurrent: true
               });
             });
  }

  private openIssueRemovalDialog(issue: IIssue): void {

    const modalData: ModalData = {
      title: undefined,
      content: 'Czy napewno chcesz usunąć ten numer?',
      buttons: {
        submit: {
          text: 'Tak'
        }
      },
      otherParams: undefined
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });

    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((actionSubmitted: boolean) => {
               if (!actionSubmitted) {
                 return;
               }

               this.issueRemove.emit(issue);
             });
  }

}
