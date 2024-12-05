import type {
  Contact,
  CreateContactDTO,
  UpdateContactDTO,
} from "../types/contact.js"

/**
 * In-memory storage for contact records.
 * Each contact follows the ContactSchema structure defined in schemas/contact.js
 * @type {Array<{
 *   id: number,
 *   name: string,
 *   phoneNumbers: Array<{
 *     type: 'Home'|'Work'|'Mobile'|'Other',
 *     label?: string,
 *     number: string
 *   }>,
 *   addresses?: Array<{
 *     type: 'Home'|'Work'|'Mobile'|'Other',
 *     label?: string,
 *     addressLine1: string,
 *     addressLine2: string,
 *     zipcode: number,
 *     state: string,
 *     country: string
 *   }>
 * }>}
 */
let contacts: Contact[] = []

/**
 * Counter for generating unique contact IDs.
 * Increments each time a new contact is created.
 * @type {number}
 */
let nextId = 1

/**
 * Service class for managing contacts in the system.
 * Provides methods for CRUD operations on contact records.
 */
export class ContactService {
  /**
   * Retrieves all contacts from the system
   * @returns {Promise<Array<Contact>>} Promise that resolves to array of all contacts
   */
  static async getAllContacts(): Promise<Contact[]> {
    return contacts
  }

  /**
   * Retrieves a single contact by ID
   * @param {number} id - The ID of the contact to retrieve
   * @returns {Promise<Contact|null>} Promise that resolves to the contact if found, null otherwise
   */
  static async getContactById(id: number): Promise<Contact | null> {
    const contact = contacts.find((c) => c.id === id)
    return contact || null
  }

  /**
   * Creates a new contact in the system
   * @param {Object} contactData - The contact data matching CreateContactSchema
   * @param {string} contactData.name - Name of the contact
   * @param {Array<Object>} contactData.phoneNumbers - Array of phone number objects
   * @param {Array<Object>} [contactData.addresses] - Optional array of address objects
   * @returns {Promise<Contact>} Promise that resolves to the newly created contact
   */
  static async createContact(contactData: CreateContactDTO): Promise<Contact> {
    const newContact: Contact = {
      id: nextId++,
      ...contactData,
    }

    contacts.push(newContact)
    return newContact
  }

  /**
   * Updates an existing contact
   * @param {number|string} id - The ID of the contact to update
   * @param {Object} contactData - Partial contact data matching UpdateContactSchema
   * @returns {Promise<Contact|null>} Promise that resolves to updated contact if found, null otherwise
   */
  static async updateContact(
    id: number,
    contactData: UpdateContactDTO,
  ): Promise<Contact | null> {
    const index = contacts.findIndex((c) => c.id === id)
    if (index === -1) return null

    const updatedContact: Contact = {
      ...contacts[index],
      ...contactData,
    }

    contacts[index] = updatedContact
    return updatedContact
  }

  /**
   * Deletes a contact from the system
   * @param {number|string} id - The ID of the contact to delete
   * @returns {Promise<boolean>} Promise that resolves to true if contact was deleted, false if not found
   */
  static async deleteContact(id: number): Promise<boolean> {
    const initialLength = contacts.length
    contacts = contacts.filter((c) => c.id !== id)
    return contacts.length !== initialLength
  }

  /**
   * Deletes all contacts from the system
   * @returns {Promise<void>} Promise that resolves when contacts were deleted
   */
  static async deleteAll(): Promise<void> {
    contacts = []
    nextId = 1
  }
}
