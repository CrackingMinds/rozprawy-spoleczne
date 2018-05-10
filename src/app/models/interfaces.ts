export interface INewIssueData {
    year: string;
    volume: number;
    number: number;
    isCurrent: boolean;
}

export interface EditorialBoardMember {
    id: string;
    name: string;
    surname: string;
    position: string;
}

export interface ScientificBoardMember {
    id: string;
    name: string;
    surname: string;
    institute: string;
}

export interface IndexingData {
    id: string;
    name: string;
    value: string;
}