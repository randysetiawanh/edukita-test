// src/models/Users.ts

export type UserRole = 'student' | 'teacher';

export interface Users {
    id: String;
    name: String;
    email: String;
    roles: UserRole;
}