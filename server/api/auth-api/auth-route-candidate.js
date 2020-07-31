const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');

const router = express.Router();

const db = require('../../db/models');
const { response } = require('express');

const candidates = db.get('candidates');

candidates.createIndex('email', { unique: true });

const schema = Joi.object().keys({
	name: Joi.string().regex(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/).required(),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
	password: Joi.string().trim().min(6).required(),
});


router.get('/', (req,res)=>{
    res.json({
        message: '🦄🌈✨Hello World!  🌈✨🦄'
    })
})

router.post('/signup',(req,res,next)=>{
    const result = schema.validate(req.body);
    if(!(result.error)){
        candidates.findOne({
            email: req.body.email
        }).then(candidate=>{
            if(candidate){
                const error = new Error('Email is already registered .');
                res.status(409);
                next(error);
            }else{
                bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword=>{
                    const newcandidate = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword
                    };
                    candidates.insert(newcandidate).then(insertedcandidate => {
                        res.json(insertedcandidate);
                    });
                });
            }
        });
    } else{
        res.status(422);
        next(result.error);
    }
})

module.exports = router;