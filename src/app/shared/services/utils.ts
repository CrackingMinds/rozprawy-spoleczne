import { Issue } from 'app/models/issue';

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

}
