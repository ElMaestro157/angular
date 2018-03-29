// REWRITE EXAMPLE
const express = require('express');
const jsonServer = require('json-server');
const router = express.Router();

router.use(jsonServer.rewriter({
  '/authors/:id': '/authors/:id',
  '/authors': '/authors'
}));

module.exports = router;
