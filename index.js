import express from "express";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mainRouter from "./routes/main.js";
import signUpRouter from "./routes/sign-up-route.js";
import loginRouter from "./routes/login-route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRouter);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);

app.listen(3000, () => console.log("Running App!"));
