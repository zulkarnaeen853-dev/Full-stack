const RegisterController = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email ? req.body.email.toLowerCase() : '';
        const password = req.body.password;

        const existedUser = await registerFormat.findOne({ email });
        if (existedUser) {
            return res.send({
                success: false,
                message: 'This email is already registered.'
            });
        }

        const registrationlist = new registerFormat({ name, email, password });
        await registrationlist.save();

        res.send({
            success: true,
            message: 'Form successfully created'
        });
    } catch (error) {
        console.error('MongoDB Save Error:', error);
        res.status(500).send({
            success: false,
            message: 'Database error occurred during registration',
            error: error.message
        });
    }
};

const LoginController = (req, res) => {

res.send({
        success: true,
        message: 'Login successful'
    });

}

module.exports = { RegisterController, LoginController };