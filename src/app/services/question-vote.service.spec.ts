import { TestBed } from '@angular/core/testing';

import { QuestionVoteService } from './question-vote.service';

describe('QuestionVoteService', () => {
  let service: QuestionVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
