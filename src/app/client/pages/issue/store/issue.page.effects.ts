import { ArticlesEffect } from 'app/repos/ngrx/articles/articles.effect';
import { IssueEffects } from 'app/repos/ngrx/issues/issue.effects';

export const issuePageEffects: any[] = [IssueEffects, ArticlesEffect];
