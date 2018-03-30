const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {
  router.get('/authors/:id', (req, res, next) => {
    const id = +req.params.id;
    let authors = server.db.getState().authors;
    if (!isNaN(id)) {
      let course = authors.find((value) => {
        return id === value.id;
      });
      course ? res.json(course.authors) : res.status(401).send("Wrong id");
    } else {
      let newAuthors = [];
      authors.forEach(element => {
        element.authors.forEach((author) => newAuthors.push(author));
      });

      res.json(newAuthors);
    }
  });

  router.get('/authors', (req, res, next) => {
    let authors = server.db.getState().authors;
    let newAuthors = new Set();
    authors.forEach(element => {
      element.authors.forEach((author) => newAuthors.add(author));
    });

    res.json(Array.from(newAuthors));
  });


	return router;
};
