export class Conversation{
    _id: string;
    members: Array<string>;
    constructor(_id:string, members: Array<string>){
        this._id = _id;
        this.members = members;
    }
}