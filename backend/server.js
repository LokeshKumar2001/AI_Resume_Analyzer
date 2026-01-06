import express, { urlencoded } from "express";
import dotenv from "dotenv";
import reviewRoutes from "./routes/review.routes.js";
import { connection } from "./config/db.js";
import cors from "cors";
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
const port = process.env.PORT || 5001;

app.use("/api", reviewRoutes);

app.listen(port, () => {
  connection();
  console.log(`server is running on ${port}`);
});
