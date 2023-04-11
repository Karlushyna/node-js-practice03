const Joi = require("joi");

const { HttpError } = require("../helpers");

const books = require("../models/books");

const addSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `"title" is required`
    }),
    author: Joi.string().required().messages({
        "any.required": `"author" is required`,
        "string.empty": `"author" cannot be empty`,
        "string.base": `"author" must be string`
    }),
})

const getAllBooks = async(req, res, next)=> {
    try {
        const result = await books.getAll();
        res.json(result);
    }
    catch(error) {
        next(error);
    }
}

const getBookById = async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await books.getById(id);
        if(!result) {
            throw HttpError(404, `Book with ${id} not found`);
        }
        res.json(result);
    }
    catch(error) {
        next(error);
    }
};

const addBook = async(req, res, next)=> {
    try {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const result = await books.add(req.body);
        res.status(201).json(result);
    }
    catch(error) {
        next(error);
    }
};

const updateBookById = async(req, res, next)=> {
    try {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const {id} = req.params;
        const result = await books.updateById(id, req.body);
        if(!result) {
            throw HttpError(404, `Book with ${id} not found`);
        }
        res.json(result);
    }
    catch(error) {
        next(error);
    }
};

const deleteBookById = async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await books.deleteById(id);
        if(!result) {
            throw HttpError(404, `Book with ${id} not found`);
        }
        // res.status(204).send()
        res.json({
            message: "Delete success"
        })
    }
    catch(error) {
        next(error);
    }
};




module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBookById,
    deleteBookById,
}