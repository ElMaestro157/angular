const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

  // Pushing new course and returning id
  router.post('/courses', (req, res, next) => {
    let course = req.body,
      courses = server.db.getState().courses;

    course.id = Math.max(...courses.map(val => +val.id)) + 1;
    courses.push(course);
    res.json(course.id);
  });

  // Getting all courses and courses' list length for optimization
	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			courses = server.db.getState().courses;
    if (queryStr) {
      queryStr = queryStr.toLowerCase();
      courses = courses.filter((val) => {
        return val.name.toLowerCase().includes(queryStr);
      });
    }
		if (!to || courses.length < to) {
			to = courses.length;
    }
    const len = courses.length;
    courses = courses.slice(from, to);


		res.json({ length: len, courses: courses });
  });

  // Getting authors' set
  router.get('/courses/getAuthors', (req, res, next) => {
    let courses = server.db.getState().courses;
    let newAuthors = new Set();
    courses.forEach(element => {
      element.authors.forEach((author) => newAuthors.add(author));
    });

    res.json(Array.from(newAuthors));
  });

  // Modifying single course
  router.post('/courses/:id([0-9]+)', (req, res, next) => {
    const id = +req.params.id;
    let courses = server.db.getState().courses;
    let course = courses.find((value) => {
      return id === value.id;
    });
    if (!course) {
      res.status(401).send("Wrong id");
    } else {
      const newCourse = req.body;
      courses.splice(courses.indexOf(course), 1, newCourse);
      res.sendStatus(200);
    }
  });

  // Getting single course
  router.get('/courses/:id([0-9]+)', (req, res, next) => {
    const id = +req.params.id;
    let courses = server.db.getState().courses;

    let course = courses.find((value) => {
      return id === value.id;
    });
    if (!course) {
      res.status(401).send("Wrong id");
    } else {
      res.json(course);
    }
  });

  // Deleting single course
  router.delete('/courses/:id([0-9]+)', (req, res, next) => {
    const id = +req.params.id;
    let courses = server.db.getState().courses;

    let course = courses.find((value) => {
      return id === value.id;
    });
    if (course) {
      courses.splice(courses.indexOf(course), 1);
    }
    res.sendStatus(200);
  });

	return router;
};
