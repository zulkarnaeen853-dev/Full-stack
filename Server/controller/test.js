const registerFormat = require('../model/RegisterModel');

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


module.exports = { DataController };
