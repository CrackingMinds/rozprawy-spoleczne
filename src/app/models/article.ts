import { IArticleType } from 'app/models/article.type';
import { Author } from 'app/models/author';
import { ArticleFile } from 'app/models/article.file';

export class Article {
    id: string;
    issue: Issue;
    articleType: IArticleType;
    title: string;
    authors: Author[] = [];
    locationInIssue: string;
    doiLink: string;
    introduction: string;
    materialsMethods: string;
    results: string;
    conclusions: string;
    keywords: string;
    pdf: ArticleFile;
}

export interface Issue {
    id: string;
    vol: number;
    number: number;
    year: string;
    isCurrent: boolean;
}

export class Literature {
    id: number;
    value: string;
}
