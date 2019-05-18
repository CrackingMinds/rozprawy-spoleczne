import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { Subject, Observable, of, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { allFalsy } from 'app/shared/custom.observable.creators';
import { firstTrue } from 'app/shared/custom.operators';

import { PageComponent } from 'app/client/pages/page.component';
import { CustomSorting } from 'app/shared/custom.sorting';

import { EditorialBoard } from 'app/models/editorial.board';
import { ScientificBoard } from 'app/models/scientific.board';

import { EDITORIAL_BOARD_ENDPOINT, EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';
import { ScientificBoardEndpoint } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';

import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-editorial-scientific-board',
  templateUrl: './editorial.scientific.board.component.html'
})
export class EditorialScientificBoardComponent extends PageComponent implements OnInit, OnDestroy {

  editorialBoard: EditorialBoard;
  scientificBoard: ScientificBoard;

  private readonly editorialBoardLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  private readonly scientificBoardLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private scientificBoardEndpoint: ScientificBoardEndpoint,
              @Inject(EDITORIAL_BOARD_ENDPOINT) private editorialBoardEndpoint: EditorialBoardEndpoint) { super(); }

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
          this.editorialBoardLoading$.next(false);
        });

    this.scientificBoardEndpoint.getScientificBoard()
      .pipe(
        map((board: ScientificBoard) => {
          return [...board].sort(CustomSorting.byCustomOrder);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: ScientificBoard) => {
        this.scientificBoard = data;
        this.scientificBoardLoading$.next(false);
      });

  }

  ngOnDestroy() {
    this.editorialBoardLoading$.complete();
    this.scientificBoardLoading$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observePageLoaded(): Observable<void> {
    return allFalsy(
      this.editorialBoardLoading$.asObservable(),
      this.scientificBoardLoading$.asObservable()
    ).pipe(firstTrue());
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.editorialAndScientificBoard());
  }

}
