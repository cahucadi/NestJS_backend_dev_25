import { Role } from "src/user/models/user.enum";

export interface ILoginStatus{
    
    id: string;
    username: string;
    accessToken: any;
    role: Role;
    expiresIn: any;
}