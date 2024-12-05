import request from "supertest"
import express from "express"
import type { Express } from "express"
import cors from "cors"
import { router as contactsRouter } from "../../routes/contacts.js"
import { ContactService } from "../../services/contacts.js"
import type { CreateContactDTO } from "../../types/contact.js"

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use("/api/contacts", contactsRouter)

describe("Contacts API", () => {
  beforeEach(() => {
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

  describe("POST /api/contacts", () => {
    it("should create a new contact", async () => {
      const res = await request(app).post("/api/contacts").send(mockContact)

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty("id")
      expect(res.body.name).toBe(mockContact.name)
    })

    it("should validate request body", async () => {
      const res = await request(app)
        .post("/api/contacts")
        .send({ name: "John Doe" }) // Missing required fields

      expect(res.status).toBe(400)
    })
  })

  describe("GET /api/contacts", () => {
    it("should return all contacts", async () => {
      await ContactService.createContact(mockContact)
      const res = await request(app).get("/api/contacts")

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(1)
    })
  })

  describe("GET /api/contacts/:id", () => {
    it("should return contact by id", async () => {
      const contact = await ContactService.createContact(mockContact)
      const res = await request(app).get(`/api/contacts/${contact.id}`)

      expect(res.status).toBe(200)
      expect(res.body.id).toBe(contact.id)
    })

    it("should return 404 for non-existent contact", async () => {
      const res = await request(app).get("/api/contacts/999")
      expect(res.status).toBe(404)
    })
  })

  describe("PUT /api/contacts/:id", () => {
    it("should update existing contact", async () => {
      const contact = await ContactService.createContact(mockContact)
      const res = await request(app)
        .put(`/api/contacts/${contact.id}`)
        .send({ name: "Jane Doe" })

      expect(res.status).toBe(200)
      expect(res.body.name).toBe("Jane Doe")
    })
  })

  describe("DELETE /api/contacts/:id", () => {
    it("should delete existing contact", async () => {
      const contact = await ContactService.createContact(mockContact)
      const res = await request(app).delete(`/api/contacts/${contact.id}`)

      expect(res.status).toBe(204)
    })
  })
})
