import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../../models/article";

@Component({
    selector: 'article-card',
    templateUrl: './article-card.component.html'
})
export class ArticleCardComponent implements OnInit {
    @Input() article: Article;
    @Input() isShortInfo: boolean = false;
    @Input() isEdit: boolean = false;

    constructor() {
    }

    ngOnInit() {
        // this.dataService.getArticle(this.articleId).subscribe((article) => {
        //     this.article = article;
        // })
    }

}
