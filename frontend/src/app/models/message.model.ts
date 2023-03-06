export class Message{
    public text: string;
    public sender: string;
    public conversationId: string;
    public createdAt: Date;
    constructor(text: string, sender: string, conversationId: string, createdAt: Date){
        this.text = text;
        this.sender = sender;
        this.conversationId = conversationId;
        this.createdAt = createdAt;
    }
}