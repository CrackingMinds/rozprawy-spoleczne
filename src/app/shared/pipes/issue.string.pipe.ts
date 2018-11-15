import { PipeTransform, Pipe } from '@angular/core';

import { IIssue } from 'app/models/issue';

@Pipe({
  name: 'issueString'
})
export class IssueStringPipe implements PipeTransform {

  transform(issue: IIssue): any {
    return `${issue.year} - Tom ${issue.vol} Nr ${issue.number}`;
  }

}
