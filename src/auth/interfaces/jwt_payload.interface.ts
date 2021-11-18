import { Role } from "src/user/models/user.enum";

export interface IJwtPayload{
    username: string;
    role: Role;
}