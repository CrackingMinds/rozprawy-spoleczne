import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

import { IArticle } from 'app/models/article';

import { PageNameService } from 'app/shared/services/page.name.service';
import { ArticleService } from 'app/services/endpoint/article/article.service';

@Component({
    selector: 'article',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
    article: IArticle;
    dataLoaded: boolean = false;

    private subscriptions = new Subscription();

    constructor(private route: ActivatedRoute,
                private pageNameService: PageNameService) {}

    ngOnInit() {
      // this.subscriptions.add(
      //   this.route.paramMap
      //       .subscribe(params => {
      //         let articleId = params.get('id');
      //         this.subscriptions.add(
      //           this.articleService.getArticle(articleId).subscribe((res: IArticle) => {
      //             this.article = res;
      //             this.dataLoaded = true;
      //             this.pageNameService.setPageName(this.article.title);
      //           })
      //         );
      //       })
      // );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
