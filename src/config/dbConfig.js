import mongoose from "mongoose";
import config from "./config";

export default async function dbConnect() {
  const URL = config.mongodb;

  mongoose.connect(
    URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) throw new Error(`Conexion fallida: ${error}`);
      console.log("Conexion exitosa");
    }
  );
}
