const express = require("express");
const prisma = require("../db");
const { checkIfAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        res.render("index.ejs", null);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get("/login", async(req, res) => {
    try{
        res.render("login.ejs", null);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get("/signup", async(req, res) => {
    try{
        res.render("signup.ejs", null);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get("/dashboard", checkIfAuthenticated, async(req, res) => {
    // Use the userId from Passport
    const userId = req.user.id;

    try{
        // Fetch user's posts from the database 
        const userPosts = await prisma.post.findMany({
            where: {
                userId: userId,
            },
        });

        // render the 'dashboard.ejs' file with userPosts data
        res.render("dashboard", { userPosts, error: false });
    } catch(error) {
        console.error(error);
        // Instead of just sending an error for the browser to handle,
        // we display the dashboard page with an error message
        res.render("dashboard", {userPosts: null, error: true});
    }
});

router.get("/create-post", checkIfAuthenticated, async(req, res) => {
    try{
        res.render("create-post.ejs", null);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router;