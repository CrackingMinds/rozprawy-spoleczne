import { ArticleFile } from 'app/models/article.file';
import { Author } from 'app/models/author';
import { ArticleType } from 'app/models/article.type';

export type Article = ArticleBase & WithId & WithArticleType;
export type UntypedArticle = ArticleBase & WithId & WithArticleTypeId;
export type ArticleEntity = ArticleBase & WithArticleTypeId;

type ArticleBase = {
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

type WithArticleTypeId = { articleTypeId: string };

type WithArticleType = { articleType: ArticleType };

type WithId = { id: string };
