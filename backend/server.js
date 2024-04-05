// Modules
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const port = process.env.PORT;

const mongoose = require("mongoose");
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB Connection Successful!"));

const server = app.listen(port, () =>
  console.log(`App running on port: ${port}`)
);
