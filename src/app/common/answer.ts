import {User} from "./user";

export class Answer {
  public editing: boolean = false;
  constructor(
    public answerId: number,
    public user: User,
    public text: string,
    public picture: string,
    public score: number,
    public creationTime: Date){}
}
