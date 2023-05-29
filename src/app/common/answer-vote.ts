import {User} from "./user";
import {Answer} from "./answer";

export class AnswerVote {
  constructor(
    public voteId: number,
    public answer: Answer,
    public user: User,
    public voteType: number){}

}
