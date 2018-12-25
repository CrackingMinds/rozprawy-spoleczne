export type Issue = IssueEntity & WithId & WithArticleInfo;
export type RawIssue = IssueBase;
export type IssueEntity = IssueBase;
export type IssueEntityWithId = IssueEntity & WithId;

export type IssuesByYear = { [year: string]: Issue[] };

type IssueBase = {
  year: string;
  vol: number;
  number: number;
  isCurrent: boolean;
}

type WithId = { id: string; }

type WithArticleInfo = { hasArticles: boolean; }
