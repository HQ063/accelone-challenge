import { ContactService } from "../../services/contacts"
import type { CreateContactDTO } from "../../types/contact"

describe("ContactService", () => {
  beforeEach(() => {
    // Reset contacts array before each test
    return ContactService.deleteAll()
  })

  const mockContact: CreateContactDTO = {
    name: "John Doe",
    phoneNumbers: [
      {
        type: "Mobile",
        number: "1234567890",
      },
    ],
    addresses: [
      {
        type: "Home",
        addressLine1: "123 Main St",
        addressLine2: "Apt 4B",
        zipcode: 12345,
        state: "NY",
        country: "USA",
      },
    ],
  }

  describe("createContact", () => {
    it("should create a new contact", async () => {
      const contact = await ContactService.createContact(mockContact)
      expect(contact).toHaveProperty("id")
      expect(contact.name).toBe(mockContact.name)
    })
  })

  describe("getAllContacts", () => {
    it("should return all contacts", async () => {
      await ContactService.createContact(mockContact)
      await ContactService.createContact({ ...mockContact, name: "Jane Doe" })

      const contacts = await ContactService.getAllContacts()
      expect(contacts).toHaveLength(2)
    })
  })

  describe("getContactById", () => {
    it("should return contact by id", async () => {
      const created = await ContactService.createContact(mockContact)
      const found = await ContactService.getContactById(created.id)
      expect(found).toEqual(created)
    })

    it("should return null for non-existent contact", async () => {
      const found = await ContactService.getContactById(999)
      expect(found).toBeNull()
    })
  })

  describe("updateContact", () => {
    it("should update existing contact", async () => {
      const created = await ContactService.createContact(mockContact)
      const updated = await ContactService.updateContact(created.id, {
        name: "Jane Doe",
      })
      expect(updated?.name).toBe("Jane Doe")
      expect(updated?.id).toBe(created.id)
    })

    it("should return null for non-existent contact", async () => {
      const updated = await ContactService.updateContact(999, {
        name: "Jane Doe",
      })
      expect(updated).toBeNull()
    })
  })

  describe("deleteContact", () => {
    it("should delete existing contact", async () => {
      const created = await ContactService.createContact(mockContact)
      const result = await ContactService.deleteContact(created.id)
      expect(result).toBe(true)

      const found = await ContactService.getContactById(created.id)
      expect(found).toBeNull()
    })

    it("should return false for non-existent contact", async () => {
      const result = await ContactService.deleteContact(999)
      expect(result).toBe(false)
    })
  })
})
