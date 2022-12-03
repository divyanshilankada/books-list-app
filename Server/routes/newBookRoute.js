const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/middleware");

const NewBookModel = require('../models/newbookModel');

router.get('/', validateToken,async (req, res) => {

    try{

        const userBooks = await NewBookModel.find({user:req.user});
        res.status(200).json({
            status:"Success",
            message:userBooks
        })
        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});


router.post('/', validateToken,async (req, res) => {

    try{

        //let token = req.headers['authorization'];

        //jwt.veri
        console.log(req.user);

        const newBook = await NewBookModel.create({
            title:req.body.title,
            author:req.body.author,
            genre:req.body.genre,
            user:req.user,
            isbn:req.body.isbn,
            publisher:req.body.publisher,
            description:req.body.description
        });

        res.status(200).json({
            status:"Success",
            message:newBook
        });
                

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});

router.delete('/:id', validateToken,async (req, res) => {

    try{

        const userBooks = await NewBookModel.deleteOne({_id:req.params.id});
        res.status(200).json({
            status:"Success",
            message:userBooks
        })
        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});

router.put('/:id', validateToken,async (req, res) => {

    try{

        const userBooks = await NewBookModel.updateOne({_id:req.params.id},req.body);
        res.status(200).json({
            status:"Success",
            message:userBooks
        })
        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});

module.exports = router;
