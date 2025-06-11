import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    const mode = req.query.mode || "login";
    const messages = req.session.messages || [];
    const formErrors = req.session.formErrors || {};
    const oldInput = req.session.oldInput || {};

    // Clear data after use
    req.session.messages = [];
    req.session.formErrors = null;
    req.session.oldInput = null;

    if (req.user) {
        res.redirect("/");
        return;
    }

    if (mode == "login") {
        res.render("login-signup-form", {
            errors: formErrors,
            oldInput: oldInput,
            failureMessage: messages[0] || null,
            mode,
        });

        req.session.messages = [];
    } else {
        res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate"
        );
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        res.render("login-signup-form", {
            errors: formErrors,
            oldInput: oldInput,
            failureMessage: null,
            mode,
        });
    }
});

export default router;
