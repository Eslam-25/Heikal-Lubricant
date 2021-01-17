import { UserRole } from "../enums/roles.enum";

export class UserAuthenticateModel{
    constructor(
        public userName: string, 
        public isAuthenticated: boolean, 
        public role: UserRole
    ){}
}