import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { DB_HOST, DB_PORT, DB_NAME } = process.env;

const MONGO_DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  const connectionData = await mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    `\n################### MONGODB CONNECTED WITH SERVER : ${connectionData.connection.host} ###################`
  );
};

export default connectDatabase;
