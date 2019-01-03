import { RoutesResolver } from 'app/routes-resolver/routes.resolver';

export class RoutesComposer {

  static composeArticleRouterLink(articleId: string): string[] {
    return [
      `/${RoutesResolver.article}`,
      articleId
    ];
  }

}
