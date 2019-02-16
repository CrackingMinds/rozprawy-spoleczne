import { Issue } from 'app/models/issue';
import { Article } from 'app/models/article';

export class Utils {

  static sortIssues(issues: Issue[]): Issue[] {
    let updatedIssues: Issue[] = [...issues];
    updatedIssues.sort((a: Issue, b: Issue) => {
      if (a.year === b.year) {

        if (a.vol === b.vol) {

          if (a.number === b.number) {
            return 0;
          }
          else {
            return Utils.sortByValue(a.number, b.number);
          }
        }
        else {
          return Utils.sortByValue(a.vol, b.vol);
        }
      }
      else {
        return Utils.sortByValue(a.year, b.year);
      }
    });

    return updatedIssues;
  }

  static sortArticles(articles: Article[]): Article[] {
    let updatedArticles = [...articles];
    updatedArticles.sort((a: Article, b: Article) => {
      return -1 * Utils.sortByValue(this.getPageInIssue(a), this.getPageInIssue(b));
    });

    return updatedArticles;
  }

  private static getPageInIssue(article: Article): number {
    const startingPage: string = article.pages.split('-')[0];
    return parseInt(startingPage);
  }

  static sortByValue(a, b) {
    if (a < b) {
      return 1;
    }
    else if (a > b) {
      return -1;
    }
    else {
      return 0;
    }
  }

  static areObjectsEqual(objA: {}, objB: {}): boolean {

    const propertiesOfB = Object.keys(objB);

    let areEqual: boolean = true;

    propertiesOfB.forEach((propertyKey: string) => {
      const propertyInA = objA[propertyKey];
      const propertyInB = objB[propertyKey];

      if (propertyInA === undefined) {

        if (!propertyInB) {
          return;
        }

      }

      let arePropertiesEqual: boolean;

      if (this.isObject(propertyInA)) {
        arePropertiesEqual = this.areObjectsEqual(propertyInA, propertyInB);
      } else {
        arePropertiesEqual = propertyInA === propertyInB;
      }

      if (!arePropertiesEqual) {
        areEqual = false;
        return;
      }

    });

    return areEqual;
  }

  static isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

}
