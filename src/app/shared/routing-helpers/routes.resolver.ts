export class RoutesResolver {

  static article(): string {
    return 'articles';
  }

  static issue(): string {
    return 'issues';
  }

  static currentIssue(): string {
    return `${RoutesResolver.issue()}/current`;
  }

  static archive(): string {
    return 'archive';
  }

  static about(): string {
    return 'about';
  }

  static editorialAndScientificBoard(): string {
    return 'editorial-scientific-board';
  }

  static reviewers(): string {
    return 'reviewers';
  }

  static indexing(): string {
    return 'indexing';
  }

  static subscriptions(): string {
    return 'subscriptions';
  }

  static contact(): string {
    return 'contact';
  }

  static requirements(): string {
    return 'requirements';
  }

  static ethicsStatement(): string {
    return 'ethics-statement';
  }

  static signIn(): string {
    return 'sign-in';
  }

}
