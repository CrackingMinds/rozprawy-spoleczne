import { PipeTransform, Pipe } from '@angular/core';

import { Issue } from 'app/models/issue';

@Pipe({
  name: 'issueString'
})
export class IssueStringPipe implements PipeTransform {

  transform(issue: Issue): any {
    return `${issue.year} - Tom ${issue.vol} Nr ${issue.number}`;
  }

}
