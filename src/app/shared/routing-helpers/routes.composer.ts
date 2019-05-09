import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';
import { AdminRoutesResolver } from 'app/shared/routing-helpers/admin.routes.resolver';

export class RoutesComposer {

  static composeArticleRouterLink(articleId: string): string[] {
    return [
      `/${RoutesResolver.article()}`,
      articleId
    ];
  }

  static composeAdminRouterLink(url: string): string {
    return `/${AdminRoutesResolver.admin()}/${url}`;
  }

  static composeClientRouterLink(url: string): string {
    return `/${url}`;
  }

}
