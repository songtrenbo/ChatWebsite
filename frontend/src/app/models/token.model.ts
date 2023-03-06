export class Token{
    public userId: string;
    public name: string;
    public email: string;
    public iat: number;
    public exp: number;
    public profilePicture: string;
    constructor(userId: string, name: string, email: string, iat: number, exp: number,profilePicture: string){
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.iat = iat;
        this.exp = exp;
        this.profilePicture = profilePicture;
    }
}