import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export function allFalsy(...sources: Array<Observable<boolean>>): Observable<boolean> {
  return combineLatest(...sources)
    .pipe(
      map((values: Array<boolean>) => {
        const value = values.reduce((acc: boolean, cur: boolean) => acc || cur);
        return value;
      }),
      map((value: boolean) => !value)
    );
}

export function allTruthy(...sources: Array<Observable<boolean>>): Observable<boolean> {
  return combineLatest(...sources)
    .pipe(
      map((values: Array<boolean>) => {
        const value = values.reduce((acc: boolean, cur: boolean) => acc && cur);
        return value;
      })
    );
}
