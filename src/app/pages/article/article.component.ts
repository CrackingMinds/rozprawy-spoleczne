import {Component, OnInit} from '@angular/core';
import {ArticleService} from "./article.service";
import {ActivatedRoute} from "@angular/router";
import {SpinnerService} from "../../services/spinner/spinner.service";
import {Article} from "../../models/article";
import {PageNameService} from "../../shared/services/page.name.service";
import {PageBase} from "../../shared/page.base";

@Component({
    selector: 'article',
    templateUrl: './article.component.html'
})
export class ArticleComponent extends PageBase implements OnInit {
    article: Article;
    dataLoaded: boolean = false;

    constructor(private route: ActivatedRoute,
                private articleService: ArticleService,
                private spinnerService: SpinnerService,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        // this.spinnerService.initializeSpinner(this.getArticleData());
        this.asyncAction = this.getArticleData();
        let self = this;
        this.asyncAction
            .then(function () {
                self.dataLoaded = true;
            });
        super.ngOnInit();
    }

    getArticleData(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.route.paramMap
                .subscribe(params => {
                    let articleId = params.get('id');
                    self.articleService.getArticle(articleId).subscribe((res: Article) => {
                        self.article = res;
                        self.changePageName(self.article.title);
                        resolve();
                    });
                })
        });
    }
}
