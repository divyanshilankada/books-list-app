const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const UserRegister = require('../models/registerUserModel');

router.get('/', async (req, res) => {

    try{

        const userDetails = await UserRegister.find();
        res.status(200).json({
            status:"Success",
            message:userDetails
        })
        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});

router.get('/:id', async (req, res) => {

    try{

        const userDetails = await UserRegister.findOne({user_name:req.params.id});

        if(userDetails)
        {
            res.status(200).json({
                status:"Success",
                message:"exists"
            })
        }
        else
        {
            res.status(200).json({
                status:"Success",
                message:"user does not exist"
            })
        }
        
        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});



router.post('/', async (req, res) => {

    console.log(req.body);
    try{

        bcrypt.hash(req.body.password, 10, async function(err, hash) {
        // Store hash in your password DB.
            if(err)
            {
                return res.status(400).json({status:"Error", message:err.message});
            }
            else
            {

                const userDetails = await UserRegister.findOne({user_name:req.body.user_name});

                if(userDetails)
                {
                    return res.status(400).json({status:"Error", message:"User name already exists"});
                }

                const UserRegistrationDetails = await UserRegister.create({
                    user_name : req.body.user_name,
                    password : hash
                });


                res.status(200).json({
                    status:"Success",
                    message:UserRegistrationDetails
                });

            }
        });
         
    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});


module.exports = router;
