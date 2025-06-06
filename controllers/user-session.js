import { dbQuery } from "../models/dbQuery.js";

export function serialize(user, done) {
    done(null, user.id);
}

export async function deserialize(id, done) {
    try {
        const query = await dbQuery("SELECT * FROM users WHERE id = $1", [id]);
        const user = query[0];

        done(null, user);
    } catch (err) {
        done(err);
    }
}
