import bcrypt from "bcryptjs";
import { dbQuery } from "../models/dbQuery.js";

export async function loginAuthentication(username, password, done) {
    const formatedUsername = username.toLowerCase();

    try {
        const query = await dbQuery(`SELECT * FROM users WHERE username = $1`, [
            formatedUsername,
        ]);

        const user = query[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return done(null, false, {
                message: "Incorrect Username or Password",
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}
