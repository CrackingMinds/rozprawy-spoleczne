import { Observable } from 'rxjs';

export interface ModalContent<I, O> {

  params: I;

  submit(): O;
  cancel(): void;

  observeSubmitPossibility(): Observable<boolean>;

}
