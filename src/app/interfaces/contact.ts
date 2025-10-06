export interface Contact {
  id: string,
  /** Nombre del contacto */
  firstName: string,
  lastName: string,
  address: string
  email: string,
  image: string,
  number: string,
  company: string
  isFavorite: boolean
  groups?: { id: number; name: string }; 
}

/** Interfaz que es igual a Contact pero sin ID */
export type NewContact = Omit<Contact,"id">;