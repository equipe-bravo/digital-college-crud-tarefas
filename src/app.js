import express, { json } from "express";

import userRoutes from "./routes/userRoutes.js";

const PORT = 8080;

const app = express();

app.use(json());

app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
