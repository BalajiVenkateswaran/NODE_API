const mongoose = require('mongoose');
const User = require('../models/users');


exports.registerUser = (req,res,next)=>{
    console.log(req.body);
    User.find({email:req.body.email}).then(docs=>{
        if(docs.length === 0){
            const user = new User({
                _id:mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
            user.save(function(err) {
                console.log("Callback");
                if (err) { 
                    console.log("error");
                    res.json({message: err});
                }
                else{
                    res.json({ message: 'User created' });
                }
            })
        } else {
            res.status(500).json({
                message: 'email already exists'
            })
        }
    })
}
exports.getUsers =  (req,res,next) => {
    User.find().select().populate().exec().then(docs=>{
        console.log(docs);
        res.status(200).json({
            count: docs.length,
            users: docs.map(item=>{ 
                return new User(item);
            })
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}

