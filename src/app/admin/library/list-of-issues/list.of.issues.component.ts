import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { IIssue } from 'app/models/issue';

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

  selectedIssue: IIssue;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.issues$
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((issues: IIssue[]) => {
          if (!this.selectedIssue) {
            this.selectIssue(issues[0]);
          }
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openIssueCreationDialog(): void {

    // let modalData: ModalData = {
    //   title: 'Dodanie nowego numeru',
    //   content: CreateIssueComponent,
    //   buttons: {
    //     submit: {
    //       text: 'Dodaj'
    //     }
    //   },
    //   otherParams: undefined
    // };
    //
    // this.dialog.open(ModalComponent, {
    //   disableClose: true,
    //   data: modalData
    // });
  }

  openMakeIssueCurrentDialog(issue: any): void {
    // let dialogRef = this.dialog.open(ModalComponent, {
    //   disableClose: true,
    //   data: {
    //     componentToLoad: MakeIssueCurrentComponent,
    //     inputData: { issue: issue.issue }
    //   }
    // });
    // dialogRef.afterClosed()
    //          .subscribe(issueData => {
    //            if (!issueData) {
    //              return;
    //            }
    //            issue.issue = issueData;
    //            this.markIssueAsCurrent(issue);
    //            this.selectIssue(issue);
    //          });
  }

  openIssueRemovalDialog(issue: any): void {
    // let dialogRef = this.dialog.open(ModalComponent, {
    //   disableClose: true,
    //   data: {
    //     componentToLoad: RemoveIssueComponent,
    //     inputData: { issue: issue }
    //   }
    // });
    // let self = this;
    // dialogRef.afterClosed()
    //          .subscribe(function (res) {
    //            if (!res) {
    //              return;
    //            }
    //            if (!res.hasOwnProperty('deleted')) {
    //              return;
    //            }
    //            self.removeIssue(issue);
    //            if (issue.issue.isCurrent) {
    //              self.lastCurrentIssue = null;
    //            }
    //            else {
    //              if (issue.selected) {
    //                if (self.issues.length > 1) {
    //                  self.selectIssue(self.issues[0]);
    //                }
    //              }
    //            }
    //          });
  }

  openChangeNameDialog(issue: any) {
    // let dialogRef = this.dialog.open(ModalComponent, {
    //   disableClose: true,
    //   data: {
    //     componentToLoad: ChangeNameComponent,
    //     inputData: { issue: issue.issue }
    //   }
    // });
    // dialogRef.afterClosed()
    //          .subscribe(res => {
    //            if (!res) {
    //              return;
    //            }
    //            if (!res.hasOwnProperty('updated')) {
    //              return;
    //            }
    //            let issueData = res.res;
    //            issue.issue = issueData;
    //            issue.issueTitle = Utilits.createIssueTitleFromObj(issue.issue);
    //            if (issueData.isCurrent) {
    //              this.markIssueAsCurrent(issue);
    //            }
    //            this.sortIssues();
    //          });
  }

  markIssueAsCurrent(issue: any) {
    // if (this.lastCurrentIssue) {
    //   this.lastCurrentIssue.issue.isCurrent = false;
    // }
    // issue.issue.isCurrent = true;
    // this.lastCurrentIssue = issue;
  }

  removeIssue(issue: any) {
    // let index = this.issues.indexOf(issue);
    // if (index !== -1) {
    //   this.issues.splice(index, 1);
    // }
  }

  selectIssue(issue: IIssue): void {
    if (issue === this.selectedIssue) {
      return;
    }

    this.selectedIssue = issue;
    this.issueSelect.emit(issue);
  }

}
