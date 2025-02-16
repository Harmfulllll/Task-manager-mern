import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.DB_URI}/${process.env.DB_NAME}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
