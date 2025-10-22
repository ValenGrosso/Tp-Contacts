export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export type NewUser = Omit<User,"id">;