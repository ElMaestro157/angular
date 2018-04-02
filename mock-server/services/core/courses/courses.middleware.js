const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

  router.post('/courses', (req, res, next) => {
    let course = req.body,
      courses = server.db.getState().courses;

    course.id = Math.max(...courses.map(val => +val.id)) + 1;
    console.log(course);
    courses.push(course);
    res.json(courses);
  });

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
    courses = courses.slice(from, to);


		res.json(courses);
  });

  router.get('/courses/getAuthors', (req, res, next) => {
    let courses = server.db.getState().courses;
    let newAuthors = new Set();
    courses.forEach(element => {
      element.authors.forEach((author) => newAuthors.add(author));
    });

    res.json(Array.from(newAuthors));
  });

  router.post('/courses/:id([0-9]+)', (req, res, next) => {
    const id = +req.params.id;
    let courses = server.db.getState().courses;
    if (id) {
      let course = courses.find((value) => {
        return id === value.id;
      });
      if (!course) {
        res.status(401).send("Wrong id");
      } else {
        const newCourse = req.body;
        console.log(newCourse);
        courses.splice(courses.indexOf(course), 1, newCourse);
        res.json(courses);
      }
    } else {
      res.status(401).send("Wrong id");
    }
  });

  router.get('/courses/:id([0-9]+)', (req, res, next) => {
    const id = +req.params.id;
    let courses = server.db.getState().courses;
    if (id) {
      let course = courses.find((value) => {
        return id === value.id;
      });
      if (!course) {
        res.status(401).send("Wrong id");
      } else {
        res.json(course);
      }
    } else {
      res.status(401).send("Wrong id");
    }
  });

  router.delete('/courses/:id([0-9]+)', (req, res, next) => {
    const id = +req.params.id;
    let courses = server.db.getState().courses;
    if (id) {
      let course = courses.find((value) => {
        return id === value.id;
      });
      courses.splice(courses.indexOf(course), 1);
    }

    res.json(courses);
  });

	return router;
};
