export interface User {
    id: number,
    /** Nombre del usuario */
    firstName: string,
    /** Apellido del usuario */
    lastName: string,
    /** Email del usuario */
    email: string,
    /** Contraseña del usuario */
    password: string
}

/** Interfaz que es igual a User pero sin ID */
export type NewUser = Omit<User,"id">;