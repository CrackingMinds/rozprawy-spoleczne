import { Component, OnDestroy, OnInit } from '@angular/core';

import { zip } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { EditorialBoardMember } from 'app/models/editorial-board-member';
import { ScientificBoardMember } from 'app/models/scientific-board-member';

import { PageNameService } from 'app/shared/services/page.name.service';
import { EditorialScientificBoardEndpoint } from 'app/endpoints/endpoint/editorial-and-scientific-board/editorial.scientific.board.endpoint';

@Component({
    selector: 'editorial-scientific-board',
    templateUrl: './editorial.scientific.board.component.html'
})
export class EditorialScientificBoardComponent implements OnInit, OnDestroy {
    editorialBoard: EditorialBoardMember[];
    scientificBoard: ScientificBoardMember[];

    private subscriptions = new Subscription();

    constructor(private editorialScientificBoardEndpoint: EditorialScientificBoardEndpoint,
                private pageNameService: PageNameService) {}

    ngOnInit() {
        this.pageNameService.setPageName('Rada Redakcyjna i Rada Naukowa');

        let getEditorialBoardMembers = this.editorialScientificBoardEndpoint.getEditorialBoardMembers();
        let getScientificBoardMembers = this.editorialScientificBoardEndpoint.getScientificBoardMembers();

        this.subscriptions.add(
          getEditorialBoardMembers.subscribe((res: EditorialBoardMember[]) => {
            this.editorialBoard = res;
          })
        );

        this.subscriptions.add(
          getScientificBoardMembers.subscribe((res: ScientificBoardMember[]) => {
            this.scientificBoard = res;
          })
        );

        let allContentLoaded = zip(
          getEditorialBoardMembers,
          getScientificBoardMembers
        ).subscribe(() => {
        });
        this.subscriptions.add(
          allContentLoaded
        );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
