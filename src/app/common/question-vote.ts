import {User} from "./user";
import {Question} from "./question";

export class QuestionVote {
  constructor(
    public voteId: number,
    public question: Question,
    public user: User,
    public voteType: number){}
}
