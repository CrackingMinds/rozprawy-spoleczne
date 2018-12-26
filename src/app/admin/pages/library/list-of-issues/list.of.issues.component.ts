import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { Issue, RawIssue } from 'app/models/issue';
import { DialogType } from 'app/base/modal/dialog.type';

import { ModalComponent } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.component';
import { ModalData } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.data';
import { IssueCRUDModalComponent } from 'app/admin/pages/library/list-of-issues/modals/create-issue/issue.crud.modal.component';

@Component({
  selector: 'rs-list-of-issues',
  templateUrl: './list.of.issues.component.html',
  styleUrls: ['./list.of.issues.component.scss']
})
export class ListOfIssuesComponent implements OnInit, OnDestroy {

  @Input('issues')
  issues$: Observable<Issue[]>;

  @Output()
  issueSelect: EventEmitter<Issue> = new EventEmitter<Issue>();

  @Output()
  issueCreate: EventEmitter<RawIssue> = new EventEmitter<RawIssue>();

  @Output()
  issueEdit: EventEmitter<Issue> = new EventEmitter<Issue>();

  @Output()
  issueRemove: EventEmitter<Issue> = new EventEmitter<Issue>();

  selectedIssue: Issue;

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
        .subscribe((issues: Issue[]) => {
          const issueMarkedAsSelected: Issue = issues.filter((issue: Issue) => issue.isCurrent)[0];
          this.selectIssue(issueMarkedAsSelected);
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectIssue(issue: Issue): void {
    if (issue === this.selectedIssue) {
      return;
    }

    this.selectedIssue = issue;
    this.issueSelect.emit(issue);
  }

  openDialog(dialogType: DialogType, issue?: Issue): void {

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
             .subscribe((newIssue: RawIssue) => {
               if (!newIssue) {
                 return;
               }
               this.issueCreate.emit({...newIssue});
             });
  }

  private openIssueEditDialog(issue: Issue): void {

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
             .subscribe((updatedIssue: Issue) => {
               if (!updatedIssue) {
                 return;
               }
               this.issueEdit.emit({...updatedIssue});
             });
  }

  private openMakeIssueCurrentDialog(issue: Issue): void {

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

  private openIssueRemovalDialog(issue: Issue): void {

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
