export class UserViewModel{
    constructor(
        public id: number,
        public userName: string,
        public roleName: string,
        public isActive: boolean,
        public roleId: number = 0
    ) {
        
    }
}