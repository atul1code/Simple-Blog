import { check, validationResult} from "express-validator"
import { User } from '../Models/user.models.js'

export const getLoginPage = (req, res, next) => {
    console.log("login page");
    if(req.session.isLoggedIn){
      return res.redirect('/publisher/publisher-dashboard');
    }
  
    res.render('../views/auth/login', {
        pageTitle: 'login',
        isLoggedIn: false,
        errors: [], 
        oldInput: {email: ''},
        user: {},
  })

}

export const postLoginPage = async (req, res, next) => {
 const {email, password} = req.body
 const user  = await User.findOne( {email: email})
 if(!user){
    console.log("user not found");
    return res.status(422).render('../views/auth/login', {
        pageTitle: 'login',
        isLoggedIn: false,
        errors: ['user not found'],
        oldInput: {email: email},
        user: {}
    })
 } 
 if(password !== user.password){
    console.log('invalid password');
    return res.status(422).render('../views/auth/login', {
        pageTitle: 'login',
        isLoggedIn: false,
        errors: ['invalid password'],
        oldInput: {email: email},
        user: {}
    })
 }

    req.session.isLoggedIn = true;
   
    req.session.user = user;
    console.log('user logged in successfully', user)
     await req.session.save( () => {
          res.redirect('/publisher/publisher-dashboard');
     });

    
}



 

export const getSignupPage = (req, res, next) => {
    console.log("signup page");
    res.render('../views/auth/signup', {
        pageTitle: 'signup', 
        isLoggedIn: false, 
        errors: [], 
        oldInput: {firstName: '', lastName: '', email: '', password: ''},
        user: {}
    })
}
 
export const postSignupPage = [ 
     
    check('firstName')
    .trim()
    .isLength( {min: 3})
    .withMessage('first name must be at least 3 characters long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("first name must only contain letters and spaces"),

    check('lastName')
    .trim()
    .isLength( {min: 3})
    .withMessage('last name must be at least 3 characters long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("last name must only contain letters and spaces"),

    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email address"),

    check('password')
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

    check('confirmPassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),

    (req, res, next) => {
       const {firstName, lastName, email, password} =req.body
       const errors = validationResult(req);
       if(!errors.isEmpty()){
           return res.status(422).render('../views/auth/signup', {
            pageTitle: 'signup',
            isLoggedIn: false,
            errors: errors.array().map(err => err.msg),
            oldInput: ({firstName, lastName, email, password}),
            user: {}
           })
       }
       const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
       })
       user.save().then(() => {
        res.redirect('/login')
       })
 
}]






export const postLogout =(req, res, next) => {
    req.session.destroy( () =>{
    res.redirect('/login')
} )
} 