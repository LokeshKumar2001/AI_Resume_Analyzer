import mongoose from "mongoose";

export const connection = async () => {
  try {
    const connect = await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log(`Mongodb connected successfully.`);
      })
      .catch((err) => {
        console.log(`Error in connection ${err}`);
      });
  } catch (error) {
    return res.status(500).json({ messsage: "Error in connection to mongodb" });
  }
};
