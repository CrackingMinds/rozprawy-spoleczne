import { ArticleFile } from 'app/models/article.file';
import { Author } from 'app/models/author';
import { IArticleType } from 'app/models/article.type';

export interface IArticle {
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
}
