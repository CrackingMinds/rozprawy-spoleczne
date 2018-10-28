import { FIssue } from 'app/models/firestore/f.issue';

export interface IIssue {
  id: string;
  data: FIssue;
}

export class Issue implements IIssue {
  id: string;
  data: FIssue;

  constructor(issue: IIssue) {
    this.id = issue.id;
    this.data = issue.data;
  }

  toString(): string {
    // 2018 - Tom 12 Nr 2
    return `${this.data.year} - Tom ${this.data.vol} Nr ${this.data.number}`;
  }
}
