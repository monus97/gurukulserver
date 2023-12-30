require("dotenv").config();
require("./model/config");
const express = require("express");
const app = express();
const router = require("./routes/userRouter");
const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(express.json())
 app.use(bodyParser.urlencoded({extended:true}))
app.use("/", router);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
