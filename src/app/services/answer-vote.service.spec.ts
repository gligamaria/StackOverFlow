import { TestBed } from '@angular/core/testing';

import { AnswerVoteService } from './answer-vote.service';

describe('AnswerVoteService', () => {
  let service: AnswerVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
