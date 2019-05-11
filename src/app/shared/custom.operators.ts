import { Observable, combineLatest, timer } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';

export const withMinDuration = (durationInMilliseconds: number = 250) => (source: Observable<any>) =>
  combineLatest(
    source,
    timer(durationInMilliseconds)
  ).pipe(
    map((data: Array<any>) => {
      return data[0];
    })
  );

export const firstTrue = () => (source: Observable<boolean>) =>
  source.pipe(
    filter((value: boolean) => value),
    take(1),
    map(() => null)
  );

export const firstFalse = () => (source: Observable<boolean>) =>
  source.pipe(
    filter((value: boolean) => !value),
    take(1),
    map(() => null)
  );
