import { Observable, ReplaySubject } from 'rxjs';

import { ModalContent } from 'app/admin/pages/library/modal/content/modal.content';

export abstract class ModalContentComponent<I = void, O = void> implements ModalContent<I, O> {

  params: I;

  private readonly canSubmit$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  cancel(): void {}

  observeSubmitPossibility(): Observable<boolean> {
    return this.canSubmit$.asObservable();
  }

  protected enableSubmit(): void {
    this.canSubmit$.next(true);
  }

  protected disableSubmit(): void {
    this.canSubmit$.next(false);
  }

  abstract submit(): O;

}
