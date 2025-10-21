export interface Contact {
  id: number,
  /** Nombre del contacto */
  firstName: string,
  lastName: string,
  address: string
  email: string,
  image: string,
  number: string,
  company: string
  isFavorite: boolean
}

/** Interfaz que es igual a Contact pero sin ID */
export type NewContact = Omit<Contact,"id">;