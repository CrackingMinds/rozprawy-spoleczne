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

  static editorialBoard(): string {
    return AdminPagesResolver.editorialBoard().url;
  }

  static scientificBoard(): string {
    return AdminPagesResolver.scientificBoard().url;
  }

  static reviewers(): string {
    return AdminPagesResolver.reviewers().url;
  }

  static indexing(): string {
    return AdminPagesResolver.indexing().url;
  }

}
