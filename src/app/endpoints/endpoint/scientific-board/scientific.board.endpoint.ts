import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { OrderChanges } from 'app/shared/order-utils/change/order.change';

import { ScientificBoard } from 'app/models/scientific.board';
import { NewScientificBoardMember, UpdatedScientificBoardMember } from 'app/models/scientific-board-member';

export const SCIENTIFIC_BOARD_ENDPOINT = new InjectionToken<ScientificBoardEndpoint>('SCIENTIFIC_BOARD_ENDPOINT');

export interface ScientificBoardEndpoint {

  getScientificBoard(): Observable<ScientificBoard>;
  postScientificBoardMember(rawMemberData: NewScientificBoardMember): Observable<void>;
  deleteScientificBoardMember(memberId: string, orderChanges: OrderChanges): Observable<void>;
  updateScientificBoardMember(memberData: UpdatedScientificBoardMember): Observable<void>;

  changeOrder(orderChanges: OrderChanges): Observable<void>;

}
