export class User{
  constructor(
    public userId: number,
    public name: String,
    public email: String,
    public userScore: number,
    public bannedStatus: number,
    public userType: number){}
}
