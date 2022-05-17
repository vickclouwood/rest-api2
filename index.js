const express = require("express");
const { body, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());

app.use("/api/company", require("./routes/companyRoutes"));

// const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
