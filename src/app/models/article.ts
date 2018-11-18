import { ArticleFile } from 'app/models/article.file';
import { Author } from 'app/models/author';
import { IArticleType } from 'app/models/article.type';

export type IArticle = RawArticle & ArticleWithId & ArticleWithType;
export type RawArticleWithTypeId = RawArticle & ArticleWithTypeId;

export type ArticleWithType = {
  articleType: IArticleType;
};

export type ArticleWithTypeId = {
  articleTypeId: string
};

export type ArticleWithId = {
  id: string;
}

export type RawArticle = {
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
