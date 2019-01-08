import { Issue } from 'app/models/issue';
import { Article } from 'app/models/article';

export type ArticleCrudParams = {
  issue?: Issue;
  article?: Article;
}
