import "dotenv/config";
import { app } from "./app";

import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blog-test");
}
const PORT = process.env.PORT || 4000;

main()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running http://localhost:" + PORT);
    });
  })
  .catch((err) => console.log(err));
