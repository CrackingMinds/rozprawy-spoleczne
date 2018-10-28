import { FArticle } from 'app/models/firestore/f.article';
import { ArticleFile } from 'app/models/article.file';
import { Author } from 'app/models/author';
import { IArticleType } from 'app/models/article.type';

export interface IArticle {
  id: string;
  data: FArticle;
}

export class Article {
    id: string;
    articleType: IArticleType;
    authors: Author[];
    conclusions: string;
    doi: string;
    introduction: string;
    issueId: string;
    keywords: string;
    pages: string;
    materialsAndMethods: string;
    pdf: ArticleFile;
    results: string;
    title: string;

    constructor(data: FArticle) {
      this.authors = data.authors;
      this.conclusions = data.conclusions;
      this.doi = data.doi;
      this.introduction = data.introduction;
      this.issueId = data.issueId;
      this.keywords = data.keywords;
      this.pages = data.pages;
      this.materialsAndMethods = data.materialsAndMethods;
      this.pdf = data.pdf;
      this.results = data.results;
      this.title = data.title;
    }

    withId(id: string): Article {
      this.id = id;
      return this;
    }

    withArticleType(type: IArticleType): Article {
      this.articleType = type;
      return this;
    }
}
