import express, { json } from "express";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const PORT = 8080;

const app = express();

app.use(json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
