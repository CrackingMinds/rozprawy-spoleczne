export type ReviewerYears = Array<ReviewerYearType>;

export type ReviewerYearType = {
  id: string;
} & ReviewerYearBase;

type ReviewerYearBase = {
  value: string;
};

export type RawReviewerYear = ReviewerYearBase;

export type ReviewerYearEntity = ReviewerYearBase;

export type NewReviewerYear = ReviewerYearBase;

export type UpdatedReviewerYear = ReviewerYearType;

export class ReviewerYear {

  static compareFn(a: ReviewerYearType, b: ReviewerYearType): number {
    const aYear: number = parseInt(a.value);
    const bYear: number = parseInt(b.value);

    if (aYear < bYear) {
      return 1;
    } else if (aYear > bYear) {
      return -1;
    } else {
      return 0;
    }
  }

}
