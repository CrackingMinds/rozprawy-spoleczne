import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

import { Article } from 'app/models/article';

import { ArticleService } from 'app/pages/article/article.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'article',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
    article: Article;
    dataLoaded: boolean = false;

    private subscriptions = new Subscription();

    constructor(private route: ActivatedRoute,
                private articleService: ArticleService,
                private basicWrapperService: BasicWrapperService,
                private pageNameService: PageNameService) {}

    ngOnInit() {
      this.subscriptions.add(
        this.route.paramMap
            .subscribe(params => {
              let articleId = params.get('id');
              this.subscriptions.add(
                this.articleService.getArticle(articleId).subscribe((res: Article) => {
                  this.article = res;
                  this.dataLoaded = true;
                  this.pageNameService.setPageName(this.article.title);
                  this.basicWrapperService.contentLoaded();
                })
              );
            })
      );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
