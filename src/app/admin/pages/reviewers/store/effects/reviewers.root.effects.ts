import { ReviewersEffects } from 'app/admin/pages/reviewers/store/effects/reviewers.effects';
import { ReviewerYearEffects } from 'app/admin/pages/reviewers/store/effects/reviewer.year.effects';

export const reviewersRootEffects: any[] = [
  ReviewersEffects,
  ReviewerYearEffects
];
