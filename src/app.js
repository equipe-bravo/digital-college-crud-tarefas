import express, { json } from "express";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const PORT = 8080;

const app = express();

app.use(json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
