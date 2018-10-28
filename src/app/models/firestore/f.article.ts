import { Author } from 'app/models/author';
import { ArticleFile } from 'app/models/article.file';

export interface FArticle {
  articleTypeId: string;
  title: string;
  authors: Author[];
  pages: string;
  doi: string;
  introduction: string;
  materialsAndMethods: string;
  results: string;
  conclusions: string;
  keywords: string;
  pdf: ArticleFile;
  issueId: string;
}
