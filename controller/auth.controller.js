export const getLoginPage = (req, res, next) => {
    console.log("login page");
    res.render('../views/auth/login')
}

export const postLoginPage = (req, res, next) => {
    res.redirect('/publisher/publisher-dashboard');
}





export const getSignupPage = (req, res, next) => {
    console.log("signup page");
    res.render('../views/auth/signup')
}

export const postSignupPage = (req, res, next) => {
    const user  = req.body
    
    console.log("account created", user)
    res.redirect('/login')
}


 
export const postLogout =(req, res, next) => {
    res.redirect('/login')
}