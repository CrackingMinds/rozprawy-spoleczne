import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { Subject, Observable, of, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { allFalsy } from 'app/shared/custom.observable.creators';
import { firstTrue } from 'app/shared/custom.operators';

import { PageComponent } from 'app/client/pages/page.component';

import { EditorialBoard } from 'app/models/editorial.board';
import { ScientificBoard } from 'app/models/scientific.board';

import { EDITORIAL_BOARD_ENDPOINT, EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';
import { SCIENTIFIC_BOARD_ENDPOINT, ScientificBoardEndpoint } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';

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

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(SCIENTIFIC_BOARD_ENDPOINT) private readonly scientificBoardEndpoint: ScientificBoardEndpoint,
              @Inject(EDITORIAL_BOARD_ENDPOINT) private readonly editorialBoardEndpoint: EditorialBoardEndpoint) { super(); }

  ngOnInit() {

    this.editorialBoardEndpoint.getEditorialBoard()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: EditorialBoard) => {
          this.editorialBoard = data;
          this.editorialBoardLoading$.next(false);
        });

    this.scientificBoardEndpoint.getScientificBoard()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ScientificBoard) => {
        this.scientificBoard = data;
        this.scientificBoardLoading$.next(false);
      });

  }

  ngOnDestroy() {
    this.editorialBoardLoading$.complete();
    this.scientificBoardLoading$.complete();

    this.destroy$.next();
    this.destroy$.complete();
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
