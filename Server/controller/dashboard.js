const registerFormat = require('../model/RegisterModel');

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

module.exports = { UpdateController, DeleteController };