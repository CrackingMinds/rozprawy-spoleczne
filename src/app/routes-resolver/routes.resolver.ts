export class RoutesResolver {

  static get article(): string {
    return 'articles';
  }

  static get issue(): string {
    return 'issues';
  }

  static get currentIssue(): string {
    return `${RoutesResolver.issue}/current`;
  }

  static get archive(): string {
    return 'archive';
  }

  static get about(): string {
    return 'about';
  }

  static get editorialAndScientificBoard(): string {
    return 'editorial-scientific-board';
  }

  static get reviewers(): string {
    return 'reviewers';
  }

  static get indexing(): string {
    return 'indexing';
  }

  static get subscriptions(): string {
    return 'subscriptions';
  }

  static get contact(): string {
    return 'contact';
  }

  static get requirements(): string {
    return 'requirements';
  }

  static get ethicsStatement(): string {
    return 'ethics-statement';
  }

  static get signIn(): string {
    return 'sign-in';
  }

}
