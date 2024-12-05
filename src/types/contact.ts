export type ContactDataType = "Home" | "Work" | "Mobile" | "Other"

export interface PhoneNumber {
  type: ContactDataType
  label?: string
  number: string
}

export interface Address {
  type: ContactDataType
  label?: string
  addressLine1: string
  addressLine2: string
  zipcode: number
  state: string
  country: string
}

export interface Contact {
  id: number
  name: string
  phoneNumbers: PhoneNumber[]
  addresses?: Address[]
}

export type CreateContactDTO = Omit<Contact, "id">
export type UpdateContactDTO = Partial<CreateContactDTO>
