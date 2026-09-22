const RegisterMiddleware = (req, res, next)=>{

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.send({
            success: false,
            message: 'All fields are required.'
        })
    }

    const EmailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(!EmailCheck.test(email)){
        return res.send({
            success: false,
            message: 'Please provide a valid email address.'
        })
    }

    if(password.length < 8){
        return res.send({
            success: false,
            message: 'Password too short and should have more then 8 characters.'
        })
    }

    next()

}

module.exports = { RegisterMiddleware };