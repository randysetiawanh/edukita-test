// src/models/User.ts

export type UserRole = 'student' | 'teacher';

export interface User {
    id: String;
    name: String;
    email: String;
    roles: UserRole;
}