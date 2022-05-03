const router = require('express').Router();
const User = require('../model/User');
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const { registerValidation } = require('./validation');



router.post('/register',async(req,res)=>{
    const  emailExist =await User.findOne({email: req.body.email})
    if(emailExist) return res.send('email already exists.')
    //lets validate the data before we make a user
    // const { error } = registerValidation(req.body);
    // if (error) return res.send(error.details[0].message);    //res.send(validateUser(User))

//     response = registerValidation(User)
  
// if(response.error)
// {  
//     console.log(response.error.details)
// }
// else
// {
//     console.log("Validated Data")
//
// hash the passwords
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    user.save();
    res.send({user: user._id});
});

//login
router.post('/login',async(req,res) => {
    //lets validate the data before we make a user
    // const { error } = registerValidation(req.body);
    // if (error) return res.send(error.details[0].message);    //res.send(validateUser(User))
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.send('Email or password is wrong.')
    //password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.send('Invalid password');

    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    res.header('auth-token',token).send(token);
    //res.send('Logged in!')
})




module.exports = router;