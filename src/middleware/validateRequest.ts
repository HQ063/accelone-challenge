import type { Request, Response, NextFunction } from "express"
import { ZodError, type ZodSchema } from "zod"

export const validateRequest = <T>(schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.parseAsync(req.body)
      req.body = validated
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Validation failed",
          details: error.errors,
        })
      } else {
        next(error)
      }
    }
  }
}
