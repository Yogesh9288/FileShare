import express from "express";
import Connection from "./database/db.js";
import router from "./routes/api.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// API routes
app.use("/", router);

// Static frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// SPA fallback (MUST be last)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

Connection();
