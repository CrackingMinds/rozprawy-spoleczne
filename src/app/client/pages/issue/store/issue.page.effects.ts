import { ArticlesEffect } from 'app/store/effects/articles.effect';
import { IssueEffects } from 'app/store/effects/issue.effects';

export const issuePageEffects: any[] = [IssueEffects, ArticlesEffect];
