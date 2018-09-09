export class Article {
    id: string;
    issue: Issue;
    articleType: ArticleType;
    title: string;
    authors: string;
    locationInIssue: string;
    doiLink: string;
    introduction: string;
    materialsMethods: string;
    results: string;
    conclusions: string;
    keywords: string;
    pdfLink: string;
}

export class ArticleType {
    id: string;
    namePl: string;
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
