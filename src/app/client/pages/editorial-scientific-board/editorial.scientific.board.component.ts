import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, zip, Observable, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { PageComponent } from 'app/client/pages/page.component';
import { CustomSorting } from 'app/shared/custom.sorting';

import { EditorialBoard } from 'app/models/editorial.board';
import { ScientificBoardMember } from 'app/models/scientific-board-member';

import { EditorialScientificBoardEndpoint } from 'app/endpoints/endpoint/editorial-and-scientific-board/editorial.scientific.board.endpoint';
import { EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-editorial-scientific-board',
  templateUrl: './editorial.scientific.board.component.html'
})
export class EditorialScientificBoardComponent extends PageComponent implements OnInit, OnDestroy {

  editorialBoard: EditorialBoard;
  scientificBoard: ScientificBoardMember[];

  editorialBoardLoaded$: Subject<void> = new Subject<void>();
  scientificBoardLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private editorialScientificBoardEndpoint: EditorialScientificBoardEndpoint,
              private editorialBoardEndpoint: EditorialBoardEndpoint) {
    super();
  }

  ngOnInit() {

    this.editorialBoardEndpoint.getEditorialBoard()
        .pipe(
          map((board: EditorialBoard) => {
            return [...board].sort(CustomSorting.byCustomOrder);
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((data: EditorialBoard) => {
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
    return of(ClientPageNamesResolver.editorialAndScientificBoard());
  }

}
