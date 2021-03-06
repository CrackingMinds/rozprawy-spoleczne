import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { OrderChanges } from 'app/shared/order-utils/change/order.change';

import { EditorialBoard } from 'app/models/editorial.board';
import { NewEditorialBoardMember, UpdatedEditorialBoardMember } from 'app/models/editorial-board-member';

export const EDITORIAL_BOARD_ENDPOINT = new InjectionToken<EditorialBoardEndpoint>('EDITORIAL_BOARD_ENDPOINT');

export interface EditorialBoardEndpoint {

  getEditorialBoard(): Observable<EditorialBoard>;
  postEditorialBoardMember(memberData: NewEditorialBoardMember): Observable<void>;
  deleteEditorialBoardMember(memberId: string, orderChanges: OrderChanges): Observable<void>;
  updateEditorialBoardMember(memberData: UpdatedEditorialBoardMember): Observable<void>;

  changeOrder(orderChanges: OrderChanges): Observable<void>;

}
