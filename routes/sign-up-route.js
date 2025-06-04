import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("sign-up-page");
});

router.post("/", (req, res) => {
    console.log("saved");
    res.redirect("/");
});

export default router;
