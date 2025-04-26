import express from "express";
import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "./src/sessions/redisClient.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
app.use(express.json());

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:",
});

app.use(
  session({
    store: redisStore,
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // use true in production with HTTPS
  })
);

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
