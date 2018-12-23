import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/services/endpoint/endpoint.services.tokens';

import { EditorialBoardMember } from 'app/models/editorial-board-member';
import { ScientificBoardMember } from 'app/models/scientific-board-member';
import { EditorialScientificBoardService } from 'app/services/endpoint/editorial-and-scientific-board/editorial.scientific.board.service';

@Injectable()
export class RestEditorialScientificBoardService extends EditorialScientificBoardService {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) {
    super();
  }

  fetchEditorialBoardMembers(): Observable<EditorialBoardMember[]> {
    return this.http.get<EditorialBoardMember[]>(this.endpointUrl + '/boards/editorial');
  }

  fetchScientificBoardMembers(): Observable<ScientificBoardMember[]> {
    return this.http.get<ScientificBoardMember[]>(this.endpointUrl + '/boards/scientific');
  }

}
