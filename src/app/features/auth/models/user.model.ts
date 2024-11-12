export type UserRole = 'admin' | 'user' | null;
export interface User {
    username: string;
    password: string;
    role: UserRole;
}
