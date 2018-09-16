import { ArticleType } from 'app/models/article.type';
import { Author } from 'app/models/author';

export class Article {
    id: string;
    issue: Issue;
    articleType: ArticleType;
    title: string;
    authors: Author[] = [];
    locationInIssue: string;
    doiLink: string;
    introduction: string;
    materialsMethods: string;
    results: string;
    conclusions: string;
    keywords: string;
    pdfLink: string;
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
