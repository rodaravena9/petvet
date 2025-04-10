import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import { httpErrorHandle } from "./middlewares/httpErrorHandle.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import authRoute from "./routes/auth.route";
import petRoute from "./routes/pet.route";
import userRoute from "./routes/user.route";
import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./config/swagger";
import { sequelize } from "./config/database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar el limitador
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por IP
  message:
    "Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde.",
  standardHeaders: true, // Informa el límite en las cabeceras `RateLimit-*`
  legacyHeaders: false, // Desactiva las cabeceras `X-RateLimit-*`
});

// Aplicar el limitador globalmente
app.use(limiter);

app.use(loggerMiddleware);

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/pets", petRoute);

app.use(httpErrorHandle);

const main = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
