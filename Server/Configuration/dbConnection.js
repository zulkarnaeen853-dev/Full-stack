const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('🎉 Database connected successfully!');
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
