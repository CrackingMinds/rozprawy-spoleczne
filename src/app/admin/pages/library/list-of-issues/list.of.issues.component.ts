import { Component, EventEmitter, Input, OnDestroy, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Issue, RawIssue } from 'app/models/issue';
import { DialogType } from 'app/models/dialog.type';

import { ModalData } from 'app/admin/pages/library/modal/modal.data';
import { ModalService } from 'app/admin/pages/library/modal/modal.service';

import { IssueCrudComponent } from 'app/admin/pages/library/crud/issue-crud/issue.crud.component';

@Component({
  selector: 'rs-list-of-issues',
  templateUrl: './list.of.issues.component.html',
  styleUrls: ['./list.of.issues.component.scss']
})
export class ListOfIssuesComponent implements OnChanges, OnDestroy {

  @Input('issues')
  issues: Issue[];

  @Output()
  issueSelect: EventEmitter<Issue> = new EventEmitter<Issue>();

  @Output()
  issueCreate: EventEmitter<RawIssue> = new EventEmitter<RawIssue>();

  @Output()
  issueEdit: EventEmitter<Issue> = new EventEmitter<Issue>();

  @Output()
  issueRemove: EventEmitter<Issue> = new EventEmitter<Issue>();

  selectedIssue: Issue;

  lastIssueMarkedAsCurrent: Issue;

  dialogType = {
    CREATE_ISSUE: DialogType.CREATE_ISSUE,
    EDIT_ISSUE: DialogType.EDIT_ISSUE,
    MAKE_ISSUE_CURRENT: DialogType.MAKE_ISSUE_CURRENT,
    REMOVE_ISSUE: DialogType.REMOVE_ISSUE
  };

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private modal: ModalService) {}

  ngOnChanges(changes: SimpleChanges) {

    if (changes.issues && changes.issues.currentValue.length) {
      this.lastIssueMarkedAsCurrent = this.issues.filter((issue: Issue) => issue.isCurrent)[0];

      if (!this.selectedIssue)
        this.selectIssue(this.lastIssueMarkedAsCurrent);
    }

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

    const modalData: ModalData<Issue> = {
      title: 'Dodanie nowego numeru',
      content: IssueCrudComponent,
      buttons: {
        submit: {
          text: 'Dodaj'
        }
      },
      otherParams: undefined
    };

    const dialogRef = this.modal.open(modalData);
    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((newIssue: RawIssue) => {
               if (!newIssue) {
                 return;
               }

               if (newIssue.isCurrent) {
                 this.unmarkLastCurrentIssue();
               }

               this.issueCreate.emit({...newIssue});
             });
  }

  private openIssueEditDialog(issue: Issue): void {

    const modalData: ModalData<Issue> = {
      title: 'Edycja numeru',
      content: IssueCrudComponent,
      buttons: {
        submit: {
          text: 'Zapisz'
        }
      },
      otherParams: issue
    };

    const dialogRef = this.modal.open(modalData);
    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((updatedIssue: Issue) => {
               if (!updatedIssue) {
                 return;
               }

               if (updatedIssue.isCurrent) {
                 this.unmarkLastCurrentIssue();
               }

               this.issueEdit.emit({...updatedIssue});
             });
  }

  private openMakeIssueCurrentDialog(issue: Issue): void {

    const modalData: ModalData<void> = {
      title: undefined,
      content: 'Czy napewno chcesz zrobić ten numer bieżącym?',
      buttons: {
        submit: {
          text: 'Tak'
        }
      },
      otherParams: undefined
    };

    const dialogRef = this.modal.open(modalData);
    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((actionSubmitted: boolean) => {
               if (!actionSubmitted) {
                 return;
               }

               this.unmarkLastCurrentIssue();

               this.issueEdit.emit({
                 ...issue,
                 isCurrent: true
               });
             });
  }

  private openIssueRemovalDialog(issue: Issue): void {

    const modalData: ModalData<void> = {
      title: undefined,
      content: 'Czy napewno chcesz usunąć ten numer?',
      buttons: {
        submit: {
          text: 'Tak'
        }
      },
      otherParams: undefined
    };

    const dialogRef = this.modal.open(modalData);
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

  private unmarkLastCurrentIssue(): void {
    this.issueEdit.emit({
      ...this.lastIssueMarkedAsCurrent,
      isCurrent: false
    });
  }

}
