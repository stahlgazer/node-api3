const express = require('express');
const db = require("./userDb");
const postsDB = require("../posts/postDb")
const router = express.Router();

// inserts new user
router.post("/", validateUser, (req, res) => {
  // do your magic!
  console.log(req.body);
  db
    .insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error adding user"
      });
    });
});

// inserts new post for specific user
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  req.body.user_id = req.params.id;
  postsDB
    .insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get all users
router.get("/", (req, res) => {
  // do your magic!
  db.get().then(users => {
    res.status(200).json(users);
  });
});

// get user by id
router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  db
    .getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// get user posts by id
router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  db
    .getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// delete a user
router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  db
    .remove(req.params.id)
    .then(user => {
      res.status(200).json({ message: "user has been removed" });
    })
    .catch(err => {
      res.status(500).json({ message: "user wasnt removed" });
    });
});

// update a user
router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  console.log(req.body);
  db
    .update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error updating user"
      });
    });
});

//custom middleware
function validateUserId(req, res, next) {
  // do your magic!
  db
    .getById(req.params.id)
    .then(user => {
      if (user.id) {
        req.user = user;
        console.log(req.user);
      } else {
        res.status(400).json({ message: "not a valid user id" });
      }
    })
    .catch(error => {
      res.status(400).json({ message: "invalid user id" });
    });
  next();
}

function validateUser(req, res, next) {
  // do your magic!
  req.body.name
    ? null
    : res.status(400).json({ message: "missing required name field" });
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  req.body.text
    ? null
    : res.status(400).json({ message: "missing required text field" });
}


module.exports = router;
