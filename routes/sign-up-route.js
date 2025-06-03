import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("sign-up-page");
});

export default router;
