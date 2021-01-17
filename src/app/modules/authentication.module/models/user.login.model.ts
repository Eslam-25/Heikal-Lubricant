import { UserRole } from "../enums/roles.enum";

export class UserLoginModel{
    constructor(
        public userName: string, 
        public password: string,
        public role: UserRole = UserRole.USER
    ){}
}