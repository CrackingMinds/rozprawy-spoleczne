import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';

export class RoutesComposer {

  static composeArticleRouterLink(articleId: string): string[] {
    return [
      `/${RoutesResolver.article()}`,
      articleId
    ];
  }

}
