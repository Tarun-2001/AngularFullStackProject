const connectToMongoo = require("./db");
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
var cors = require("cors");
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send(`Successfully connected to  ${PORT}`);
});

app.use("/api/student", require("./routes/student.js"));

app.listen(PORT, () => {
  connectToMongoo();
  console.log(`Server is running at ${PORT}`);
});
