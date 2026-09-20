const registerFormat = require('../Model/RegisterModel')

const DeleteController = async (req, res) => {
    try {
        const userId = req.params.id;

        // Replace 'User' below with the actual name of your Mongoose Model
        const deletedUser = await registerFormat.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User deleted successfully!" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = DeleteController;