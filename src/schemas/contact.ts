import { z } from "zod"
import type {
  Contact,
  CreateContactDTO,
  UpdateContactDTO,
} from "../types/contact.js"

const ContactDataType = z.enum(["Home", "Work", "Mobile", "Other"])

export const PhoneNumberSchema = z.object({
  type: ContactDataType,
  label: z.string().optional(),
  number: z.string().regex(/^\+?\d{8,15}$/),
})

export const AddressSchema = z.object({
  type: ContactDataType,
  label: z.string().optional(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  zipcode: z.number().int().positive(),
  state: z.string(),
  country: z.string(),
})

export const ContactSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  phoneNumbers: z.array(PhoneNumberSchema).min(1),
  addresses: z.array(AddressSchema).optional(),
}) satisfies z.ZodType<Contact>

export const CreateContactSchema = ContactSchema.omit({
  id: true,
}) satisfies z.ZodType<CreateContactDTO>
export const UpdateContactSchema =
  CreateContactSchema.partial() satisfies z.ZodType<UpdateContactDTO>
