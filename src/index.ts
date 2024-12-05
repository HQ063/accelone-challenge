import express from "express"
import cors from "cors"
import morgan from "morgan"
import { router as contactsRouter } from "./routes/contacts.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Routes
app.use("/contacts", contactsRouter)

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err.stack)
    res.status(500).json({ error: "Something went wrong!" })
  },
)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
