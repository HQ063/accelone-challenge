import { Request, Response } from "express"
import { ContactService } from "../services/contacts.js"
import type { CreateContactDTO, UpdateContactDTO } from "../types/contact.js"

interface ValidatedRequest<T> extends Request {
  body: T
}

export class ContactController {
  /**
   * Get all contacts.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllContacts(_req: Request, res: Response) {
    try {
      const contacts = await ContactService.getAllContacts()
      res.json(contacts)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }

  /**
   * Get a contact by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
  static async getContactById(req: Request, res: Response) {
    try {
      const contact = await ContactService.getContactById(Number(req.params.id))
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" })
      }
      res.json(contact)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }

  /**
   * Create a new contact.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
  static async createContact(
    req: ValidatedRequest<CreateContactDTO>,
    res: Response,
  ) {
    try {
      const contact = await ContactService.createContact(req.body)
      res.status(201).json(contact)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  /**
   * Update an existing contact.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateContact(
    req: ValidatedRequest<UpdateContactDTO>,
    res: Response,
  ) {
    try {
      const contact = await ContactService.updateContact(
        Number(req.params.id),
        req.body,
      )
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" })
      }
      res.json(contact)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  /**
   * Delete a contact by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteContact(req: Request, res: Response) {
    try {
      const success = await ContactService.deleteContact(Number(req.params.id))
      if (!success) {
        return res.status(404).json({ error: "Contact not found" })
      }
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
}
