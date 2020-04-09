const express = require('express');
// const morgan = require("morgan"); // remember to require the module after installing it
const helmet = require("helmet");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();

// middleware
server.use(logger);
server.use(helmet());
server.use(express.json()); // built-in middleware, no need to install it
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
}

module.exports = server;
