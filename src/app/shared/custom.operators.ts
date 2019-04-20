import { Observable, combineLatest, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export const withMinDuration = (durationInMilliseconds: number) => (source: Observable<any>) =>
  combineLatest(
    source,
    timer(durationInMilliseconds)
  ).pipe(
    map((data: Array<any>) => {
      return data[0];
    })
  );
