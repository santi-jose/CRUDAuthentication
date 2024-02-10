const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");

const staticRoutes = require("./routes/static");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");

const { setupPassportLocal } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const logger = (req, _res, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`${time} ${req.method} ${req.url}`);
    next();
}

// set the templating engine to use ejs so we can render pages from the server
app.set("view engine", 'ejs');
// create a static folder to serve assets like css files, images, javascript 
// files, and any other files 
app.use(express.static("public"));

// Allow express to parse form and json data from the client
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger);

// Create a session to be used with clients that connect
app.use(
    session({
        secret: process.env.SECRET_KEY, // The secret key should not be put
                                        // into the code itself but just use
                                        // an env variable
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Adjust this based on deployment environment
    }),
);

app.use(passport.initialize());
setupPassportLocal(passport);
app.use(passport.session());

// Using the method to break up the routes to their own respective routes
// "/" redirects to the static pages
// "/auth" redirects to the authentication routes
// "/posts" redirects to the post methods
// <https://express.js.com/en/4x/api.html#app.use> in the callback section 
// for more information 
app.use("/", staticRoutes);
app.use("/auth", authRoutes(passport));
app.use("/posts", postsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
