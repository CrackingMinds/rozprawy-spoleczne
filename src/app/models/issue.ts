export type IIssue = IRawIssue & IDBIssue;

export interface IRawIssue {
  year: string;
  vol: number;
  number: number;
  isCurrent: boolean;
}

export interface IDBIssue {
  id: string;
  hasArticles: boolean;
}
