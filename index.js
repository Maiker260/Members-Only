import express from "express";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { loginAuthentication } from "./controllers/login-authentication.js";
import { serialize, deserialize } from "./controllers/user-session.js";
import dotenv from "dotenv";
import mainRouter from "./routes/main.js";
import signUpRouter from "./routes/sign-up-route.js";
import loginRouter from "./routes/login-route.js";
import logoutRouter from "./routes/log-out-route.js";
import messageRouter from "./routes/create-message.js";
import membershipRouter from "./routes/request-membership.js";
import authForm from "./routes/authenticate-form.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSIONPWD,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.session());

passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

passport.use(new LocalStrategy(loginAuthentication));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRouter);
app.use("/auth", authForm);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/new-message", messageRouter);
app.use("/req-membership", membershipRouter);

app.listen(3000, () => console.log("Running App!"));
