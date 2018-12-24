import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/endpoints/endpoint.tokens';

import { EditorialBoardMember } from 'app/models/editorial-board-member';
import { ScientificBoardMember } from 'app/models/scientific-board-member';
import { EditorialScientificBoardEndpoint } from 'app/endpoints/endpoint/editorial-and-scientific-board/editorial.scientific.board.endpoint';

@Injectable()
export class RestEditorialScientificBoardEndpoint extends EditorialScientificBoardEndpoint {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) { super(); }

  getEditorialBoardMembers(): Observable<EditorialBoardMember[]> {
    return this.http.get<EditorialBoardMember[]>(this.endpointUrl + '/boards/editorial');
  }

  getScientificBoardMembers(): Observable<ScientificBoardMember[]> {
    return this.http.get<ScientificBoardMember[]>(this.endpointUrl + '/boards/scientific');
  }

}
