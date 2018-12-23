import { IssuesEffect } from 'app/repos/ngrx/issues/issues.effect';
import { ArticlesEffect } from 'app/repos/ngrx/articles/articles.effect';

export const libraryEffects: any[] = [IssuesEffect, ArticlesEffect];
