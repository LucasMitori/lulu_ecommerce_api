import "express-async-errors";
import express from "express";
import cors from "cors";
import { setupSwagger } from "./swagger";

const app = express();

app.use(express.json());
app.use(cors());

setupSwagger(app);

import { usersRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import { purchasesRoutes } from "./routes/purchases.routes";
import { productRoutes } from "./routes/products.routes";
import { handleError } from "./errors";

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/purchases", purchasesRoutes);
app.use("/products", productRoutes);

app.use(handleError);

export { app };
