import { IF_ArticleFile } from 'app/models/firestore/article.file.f';
import { Author } from 'app/models/author';
import { ArticleType } from 'app/models/article.type';

export type Article = ArticleBase & WithId & WithArticleType;
export type ArticleEntity = ArticleBase & WithArticleTypeId;
export type UntypedArticle = ArticleEntity & WithId;

type ArticleBase = {
  authors: Author[];
  conclusions: string;
  doi: string;
  introduction: string;
  issueId: string;
  keywords: string;
  pages: string;
  materialsAndMethods: string;
  pdf: IF_ArticleFile;
  results: string;
  title: string;
}

type WithArticleTypeId = { articleTypeId: string };

type WithArticleType = { articleType: ArticleType };

type WithId = { id: string };
