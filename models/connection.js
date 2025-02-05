const mongoose = require("mongoose");
require('dotenv').config();
mongoose
  .connect(
    process.env.CONNECTION_STRING, {connectTimeoutMS: 2000}
  )
  .then(() => console.log("db connecté !"))
  .catch((error) => console.log(error));
