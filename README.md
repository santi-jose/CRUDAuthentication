# CRUD Authentication

## About
This project serves as my introduction to Authentication in a CRUD web application.

A user is required to register to use this web application. From the root path '/', the view, index.ejs, is rendered and routed by our static.js file on the backend. On this page we have two links, one to the '/login' path for existing users, and a '/signup' path to register a new user. 

The '/login' path renders the login.ejs view, while the '/signup' path renders the signup.ejs view. These paths are also routed by the static.js file. We can login an existing user through the login.ejs view or we can register a new user through the signup.ejs view. The login.ejs view has links to the '/register' and '/dashboard' paths, while the register.ejs view has links to the '/login' '/dashboard' paths. 

The login.ejs view has a form with text input for an email and a password to log a user in. The Login button under the text input fields is used to trigger a POST method to path '/auth/login' which authenticates the user credentials via passport. On successful authentication we are redirected to the '/dashboard' path. Failure to authenticate results in a redirect to '/login' again. 

The signup.ejs view is similar. It has input fields of type text for a username and password, but it has a Signup button following the text inputs to trigger a POST method to path '/auth/register'. This path generates a user ID, stores the user email, hashes the password, and then saves this user and their information in the MongoDB database using our prisma schema. Finally after this, the user is logged into their account using passport. If the login is successful they are redirected to the '/dashboard' path. 

The dashboard.ejs view is rendered at path '/dashboard' and routed by static.js. Here we have links to create a post through path '/create-post'. Clicking the Create Post link takes us to the create-post.ejs view where the user can create a new post. This path is routed by static.js. There is also a logout button which triggers a POST method to the path '/auth/logout', handled by auth.js. After succesfully logging out we are redirected to the login.ejs view. 

In the create-post.ejs view we have two input text fields for the title and content of a user post. Under these text input fields we have a Create button which triggers a POST method to route '/posts/create-post'. This POST request is handled on the backend by the posts.js file. In posts.js we store the user's new post into our MongoDB database using our prisma schema. After successful creation of this post document on MongoDB we are redirected to the '/dashboard' path. 

Here we can either logout or create another post as previously described. 

## 