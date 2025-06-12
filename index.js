import express from "express";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pg from "pg";
import pgSession from "connect-pg-simple";
import dotenv from "dotenv";
import session from "express-session";
import { loginAuthentication } from "./controllers/login-authentication.js";
import { serialize, deserialize } from "./controllers/user-session.js";
import mainRouter from "./routes/main.js";
import signUpRouter from "./routes/sign-up-route.js";
import loginRouter from "./routes/login-route.js";
import logoutRouter from "./routes/log-out-route.js";
import messageRouter from "./routes/create-message.js";
import membershipRouter from "./routes/request-membership.js";
import authForm from "./routes/authenticate-form.js";
import deleteMessageRouter from "./routes/delete-message-route.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Avoid using the default in-memory session store from express-session.
const pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const PgSession = pgSession(session);

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// Avoid using the default in-memory session store from express-session.
app.use(
    session({
        store: new PgSession({
            pool: pgPool,
            tableName: "session",
        }),
        secret: process.env.SESSIONPWD,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
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
app.use("/delete-message", deleteMessageRouter);

app.listen(3000, () => console.log("Running App!"));
