const registerFormat = require('../Model/RegisterModel');

const DataController = async (req, res) => {
    try {
        const { name, email, password } = req.query;

        const searchFilter = {};
        if (name) searchFilter.name = name;
        if (email) searchFilter.email = email;
        if (password) searchFilter.password = password;

        const data = await registerFormat.find(searchFilter);

        console.log('Data read successfully:', data);

        res.status(200).json({
            success: true,
            message: 'data has been read',
            usersData: data
        });
    } catch (error) {
        console.error('Error reading database:', error.message);
        res.status(500).json({
            success: false,
            message: 'failed to read database data'
        });
    }
};

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

const UpdateController = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password } = req.body;

        const updatedUser = await registerFormat.findByIdAndUpdate(
            userId,
            { name, email, password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User data updated successfully!' });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const DeleteController = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await registerFormat.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully!' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    DataController,
    RegisterController,
    UpdateController,
    DeleteController,
};
