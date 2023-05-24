import mongoose from "mongoose";

let isConnected = false;

const options = {
  dbName: "share_prompt",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", options);

    isConnected = true;

    console.log("MongoDB has successfully connected");
  } catch (err) {
    console.log("MongoDB connection error ", err);
  }
};
