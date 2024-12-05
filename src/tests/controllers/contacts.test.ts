import type { Request, Response } from "express"
import { ContactController } from "../../controllers/contacts"
import { ContactService } from "../../services/contacts"
import type { CreateContactDTO } from "../../types/contact"

describe("ContactController", () => {
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    }
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
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

  describe("getAllContacts", () => {
    it("should return all contacts", async () => {
      await ContactService.createContact(mockContact)
      await ContactController.getAllContacts(req as Request, res as Response)
      expect(res.json).toHaveBeenCalled()
      expect((res.json as jest.Mock).mock.calls[0][0]).toHaveLength(1)
    })
  })

  describe("getContactById", () => {
    it("should return contact when found", async () => {
      const contact = await ContactService.createContact(mockContact)
      req.params = { id: contact.id.toString() }
      await ContactController.getContactById(req as Request, res as Response)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ id: contact.id }),
      )
    })

    it("should return 404 when contact not found", async () => {
      req.params = { id: "999" }
      await ContactController.getContactById(req as Request, res as Response)
      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe("createContact", () => {
    it("should create new contact", async () => {
      req.body = mockContact
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await ContactController.createContact(req as any, res as Response)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ name: mockContact.name }),
      )
    })
  })

  describe("updateContact", () => {
    it("should update existing contact", async () => {
      const contact = await ContactService.createContact(mockContact)
      req.params = { id: contact.id.toString() }
      req.body = { name: "Jane Doe" }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await ContactController.updateContact(req as any, res as Response)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ name: "Jane Doe" }),
      )
    })

    it("should return 404 when contact not found", async () => {
      req.params = { id: "999" }
      req.body = { name: "Jane Doe" }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await ContactController.updateContact(req as any, res as Response)
      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe("deleteContact", () => {
    it("should delete existing contact", async () => {
      const contact = await ContactService.createContact(mockContact)
      req.params = { id: contact.id.toString() }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await ContactController.deleteContact(req as any, res as Response)
      expect(res.status).toHaveBeenCalledWith(204)
    })

    it("should return 404 when contact not found", async () => {
      req.params = { id: "999" }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await ContactController.deleteContact(req as any, res as Response)
      expect(res.status).toHaveBeenCalledWith(404)
    })
  })
})
