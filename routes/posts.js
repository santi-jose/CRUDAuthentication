const express = require("express");
const prisma = require("../db");
const { checkIfAuthenticated } = require("../middleware/authMiddleware");

router = express.Router();

router.post("/create-post", checkIfAuthenticated, async (req, res) => {
    try{
        const { title, content } = req.body;
        const userId = req.user.id;

        await prisma.post.create({
            data: {
                title, 
                content,
                userId,
            },
        });

        res.redirect("/dashboard");
    }catch(error){
        console.error(error, res.status(500).json({error: "Internal Server Error"}));
    }
});

// router.post("/posts/:userPostsId", checkIfAuthenticated, async(req, res) => {

// });

module.exports = router;