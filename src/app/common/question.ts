import {User} from "./user";
import {Answer} from "./answer";
import {Tag} from "./tag";

export class Question {
  constructor(
    public questionId: number,
    public user: User,
    public title: string,
    public text: string,
    public picture: string,
    public score: number,
    public creationTime: Date,
    public answers: Answer[],
    public questionTags: Tag[]){}
}
