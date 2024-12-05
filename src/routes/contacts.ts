import { Router } from "express"
import { ContactController } from "../controllers/contacts.js"
import { validateRequest } from "../middleware/validateRequest.js"
import { CreateContactSchema, UpdateContactSchema } from "../schemas/contact.js"

export const router = Router()

router.get("/", ContactController.getAllContacts)
router.get("/:id", ContactController.getContactById)
router.post(
  "/",
  validateRequest(CreateContactSchema),
  ContactController.createContact,
)
router.put(
  "/:id",
  validateRequest(UpdateContactSchema),
  ContactController.updateContact,
)
router.delete("/:id", ContactController.deleteContact)
