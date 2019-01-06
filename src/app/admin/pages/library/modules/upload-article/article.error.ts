export type ArticleFileError = {
  type: ArticleFileErrorType;
  content: ArticleFileErrorContent;
}

export enum ArticleFileErrorType {
  FILE_EXISTS
}

export type ArticleFileErrorContent = ArticleFileExistsError;

export type ArticleFileExistsError = {
  articleId: string;
};
