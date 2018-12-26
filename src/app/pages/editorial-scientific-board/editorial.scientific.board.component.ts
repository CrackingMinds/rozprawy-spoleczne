import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, zip, Observable, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Page } from 'app/pages/page';

import { EditorialBoardMember } from 'app/models/editorial-board-member';
import { ScientificBoardMember } from 'app/models/scientific-board-member';

import { EditorialScientificBoardEndpoint } from 'app/endpoints/endpoint/editorial-and-scientific-board/editorial.scientific.board.endpoint';

@Component({
  selector: 'rs-editorial-scientific-board',
  templateUrl: './editorial.scientific.board.component.html'
})
export class EditorialScientificBoardComponent extends Page implements OnInit, OnDestroy {

  editorialBoard: EditorialBoardMember[];
  scientificBoard: ScientificBoardMember[];

  editorialBoardLoaded$: Subject<void> = new Subject<void>();
  scientificBoardLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private editorialScientificBoardEndpoint: EditorialScientificBoardEndpoint) {
    super();
  }

  ngOnInit() {

    this.editorialScientificBoardEndpoint.getEditorialBoardMembers()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: EditorialBoardMember[]) => {
          this.editorialBoard = data;
          this.editorialBoardLoaded$.next();
        });

    this.editorialScientificBoardEndpoint.getScientificBoardMembers()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: ScientificBoardMember[]) => {
          this.scientificBoard = data;
          this.scientificBoardLoaded$.next();
        });

  }

  ngOnDestroy() {

    this.editorialBoardLoaded$.complete();
    this.scientificBoardLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoaded(): Observable<void> {
    return zip(
      this.editorialBoardLoaded$.asObservable(),
      this.scientificBoardLoaded$.asObservable()
    ).pipe(
      map(() => null)
    );
  }

  observePageName(): Observable<string> {
    return of('Rada Redakcyjna i Rada Naukowa');
  }

}
