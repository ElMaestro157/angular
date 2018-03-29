const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			courses = server.db.getState().courses;
		console.log(sort);
    console.log(queryStr);
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

  router.get('/courses/:id', (req, res, next) => {
    const id = +req.params.id;
    let courses = server.db.getState().courses;
    console.log(id);
    if (id) {
      let course = courses.find((value) => {
        return id === value.id;
      });
      courses.splice(courses.indexOf(course), 1);
      // if (!courses.splice(courses.indexOf(course), 1)) {
      //   res.status(401).send("Wrong id");
      // }
    }

    res.json(courses);
  });

	return router;
};
