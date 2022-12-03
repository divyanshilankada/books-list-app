const { Router } = require('express');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserRegister = require('../models/registerUserModel');
const bcrypt = require('bcrypt');

const secret = process.env.SECRET;
//console.log(secret, "jjj");

router.get('/', (req, res) => {
    res.send("login Route");
})

router.post('/', async (req, res) => {


    try{

        if(req.body.password && req.body.user_name)
        {
            const userCheck = await UserRegister.findOne({user_name:req.body.user_name});
            if(req.body.password === userCheck.password)
            {
                console.log(req.body, userCheck);
            }
            if(userCheck)
            {
                bcrypt.compare(req.body.password, userCheck.password).then(function(result) { 
                    
                    if(result)
                    {
                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: userCheck._id
                          }, secret);
                          
                        res.status(200).json({
                            status:"Success",
                            message:"Login Successful",
                            name:userCheck.user_name,
                            token: token
                        });
                    }
                    else
                    {
                        return res.status(400).json({status:"Error", message:"Incorrect password"});
                    }

                });
            }
            else
            {
                return res.status(400).json({status:"Error", message:"Invalid user name"});
            }
   
            
        }
        else
        {
            return res.status(400).json({status:"Error", message:"password/user name field is missing"});
        }

        
    }
    catch(e)
    {
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }
    
})

module.exports = router;



