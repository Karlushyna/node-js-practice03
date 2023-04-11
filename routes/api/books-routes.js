const express = require("express");

const ctrl = require("../../controllers/books-controllers");

const books = require("../../models/books");


const router = express.Router();



router.get("/", ctrl.getAllBooks);

router.get("/:id", ctrl.getBookById);

router.post("/", ctrl.addBook);

router.put("/:id", ctrl.updateBookById);

router.delete("/:id", ctrl.deleteBookById);

module.exports = router;