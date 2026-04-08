import path from "path"
import { fileURLToPath } from "url"
import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/dbConfig.js"

// Local Imports
import errorHandler from "./middleware/errorHandler.js"
import authRoutes from "./routes/authRoutes.js"
import followRoutes from "./routes/followRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import savedPostsRoutes from "./routes/savedPostRoutes.js"

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const PORT = process.env.PORT || 8080
const app = express()

// DB Connection
connectDB()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")))
}

// ── API Routes ────────────────────────────────────────────────────
app.use("/api/auth", authRoutes)
app.use("/api/user", followRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/saved-posts", savedPostsRoutes)

// ── Catch-all: serve React for non-API routes ─────────────────────
if (process.env.NODE_ENV === "production") {
    // ✅ Express v5 compatible wildcard
    app.get("/{*splat}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/dist/index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.json({ message: "WELCOME TO VISIONEX API..." })
    })
}

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.black)
})