import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../services/spinner/spinner.service";
import {EditorialScientificBoardService} from "./editorial.scientific.board.service";
import {EditorialBoardMember, ScientificBoardMember} from "../../models/interfaces";
import {PageBase} from "../../shared/page.base";
import {PageNameService} from "../../shared/services/page.name.service";

@Component({
    selector: 'editorial-scientific-board',
    templateUrl: './editorial.scientific.board.component.html'
})
export class EditorialScientificBoardComponent extends PageBase implements OnInit {
    editorialBoard: EditorialBoardMember[];
    scientificBoard: ScientificBoardMember[];

    constructor(private spinnerService: SpinnerService,
                private editorialScientificBoardService: EditorialScientificBoardService,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        this.asyncAction = this.getMemberLists();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('Rada Redakcyjna i Rada Naukowa');
            });
        super.ngOnInit();
    }

    getMemberLists(): Promise<any> {
        let bothBoardsMembersPromises: Promise<any>[] = [];
        bothBoardsMembersPromises.push(this.getEditorialBoardMembers());
        bothBoardsMembersPromises.push(this.getScientificBoardMembers());
        return Promise.all(bothBoardsMembersPromises);
    }

    getEditorialBoardMembers(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.editorialScientificBoardService.getEditorialBoardMembers()
                .subscribe((res: EditorialBoardMember[]) => {
                    self.editorialBoard = res;
                    resolve();
                })
        });
    }

    getScientificBoardMembers(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.editorialScientificBoardService.getScientificBoardMembers()
                .subscribe((res: ScientificBoardMember[]) => {
                    self.scientificBoard = res;
                    resolve();
                })
        });
    }
}
