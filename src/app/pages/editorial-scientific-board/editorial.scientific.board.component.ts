import { Component, OnDestroy, OnInit } from '@angular/core';

import { zip } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { EditorialBoardMember } from 'app/models/editorial-board-member';
import { ScientificBoardMember } from 'app/models/scientific-board-member';

import { PageNameService } from 'app/shared/services/page.name.service';
import { EditorialScientificBoardService } from 'app/services/endpoint/editorial-and-scientific-board/editorial.scientific.board.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';

@Component({
    selector: 'editorial-scientific-board',
    templateUrl: './editorial.scientific.board.component.html'
})
export class EditorialScientificBoardComponent implements OnInit, OnDestroy {
    editorialBoard: EditorialBoardMember[];
    scientificBoard: ScientificBoardMember[];

    private subscriptions = new Subscription();

    constructor(private editorialScientificBoardService: EditorialScientificBoardService,
                private basicWrapperService: BasicWrapperService,
                private pageNameService: PageNameService) {}

    ngOnInit() {
        this.pageNameService.setPageName('Rada Redakcyjna i Rada Naukowa');

        let getEditorialBoardMembers = this.editorialScientificBoardService.fetchEditorialBoardMembers();
        let getScientificBoardMembers = this.editorialScientificBoardService.fetchScientificBoardMembers();

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
          this.basicWrapperService.contentLoaded();
        });
        this.subscriptions.add(
          allContentLoaded
        );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
