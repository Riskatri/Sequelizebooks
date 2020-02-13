var model = require("../models/index");
const express = require("express");


module.exports = function(app){
const { check, validationResult } = require('express-validator');
    app.post("/books", [
        check('title').isLength({min:5}),
        check('author').isLength({ max:35}),
        check('published_date'),
        check('pages').isNumeric(),
        check('language'),
        check('published_id')],
        function(req,res) {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json({
                    data: [],
                    message: "GAGAL!"
                })
            }
        const { title, author, publised_date, pages, language, publised_id} = req.body;
        model.Book.create({
       
            title: title,
            author: author,
            publised_date: publised_date,
            pages: pages,
            language: language,
            publised_id: publised_id
        })
        .then(books => res.status(201).json({
            data: books,
            massage: "has been created"
        }))
        .catch(error => res.status(500).json({
            data: [],
            error: error
        })
        );
    });
    app.get("/books", function(req,res){
        model.Book.findAll({})
        .then(books => res.status(201).json({
            data: books
        }))
        .catch(error=> res.status(500).json({
            data: [],
            error: error
        }))
    });
    app.put("/books/:id", function(req,res){
        const books_id = req.params.id;
        const { title, author, publised_date, pages, language, publised_id} = req.body;
        model.Book.update(
            {
            title: title,
            author: author,
            publised_date: publised_date,
            pages: pages,
            language: language,
            publised_id: publised_id
            },
            {
                where: {
                    id: books_id
                }
            }
        )
        .then(books => res.status(201).json({
            data: books,
            massage: "book has been update"
        }))
        .catch(error => res.status(500).json({
            error: error
        }))
    });
    app.delete("/books/:id",function(req,res){
        const book_id = req.params.id;
        model.Book.destroy({
            where:{
                id: book_id
            }
        })
        .then(status => res.status(201).json({
            message: "book has been delete"
        }))
        .catch(error => res.status(500).json({
            error:error
        }))
    })
}