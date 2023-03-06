export class User{
    public _id: string;
    public email: string;
    public name: string;
    public password: string;
    public confirmPassword: string;
    public token: string;
    public profilePicture: string;
    constructor(email: string, name: string, password: string, confirmPassword: string, token: string, profilePicture: string,  _id: string){
        this._id = _id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.token = token;
        this.profilePicture = profilePicture;
    }
}