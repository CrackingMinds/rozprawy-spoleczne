import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';

export class AdminRoutesResolver {

  static admin(): string {
    return 'admin';
  }

  static dashboard(): string {
    return AdminPagesResolver.dashboard().url;
  }

  static library(): string {
    return AdminPagesResolver.library().url;
  }

  static editorialBoardEdit(): string {
    return AdminPagesResolver.editorialBoardEdit().url;
  }

}
