const express = require("express");
const mysqlfunc = require("./helper/db-connect");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
var db = mysqlfunc();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"../public")));
const authRoutes = require("./routes/auth.route");

console.log(path.join(__dirname,"../public"));

// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: "I am working",
//   });
// });

app.use("/api", authRoutes);
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(403).json({
      message: "Forbidden",
    });
  }
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
