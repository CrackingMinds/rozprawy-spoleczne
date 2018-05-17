import {Issue} from "../../models/article";

export class Utilits {

    static sortIssues(issues: Issue[]): void {
        issues.sort(function (a: Issue, b: Issue) {
            if (a.year === b.year) {

                if (a.vol === b.vol) {

                    if (a.number === b.number) {
                        return 0;
                    }
                    else {
                        return  Utilits.sortByValue(a.number, b.number);
                    }
                }
                else {
                    return Utilits.sortByValue(a.vol, b.vol);
                }
            }
            else {
                return Utilits.sortByValue(a.year, b.year);
            }
        })
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

    static createIssueTitleFromObj(issue: Issue, withYear: boolean = true): string {
        let result = '';
        if (withYear) {
            result += new Date(issue.year).getFullYear() + ' - ';
        }
        result += 'Tom ' + issue.vol + ' Nr ' + issue.number;
        return  result;
    }
}