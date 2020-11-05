require("dotenv").config();

//Define Packages
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//My Routes
const banRoutes = require("./routes/banquet");
const geoRoutes = require("./routes/geolocation");

//DB Connection
mongoose
   .connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017/food", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
   })
   .then(() => {
      console.log("DB CONNECTED");
   });

//Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/upload", express.static(path.join(__dirname, "public/upload")));

//Routes
app.use("/api", banRoutes);
app.use("/api", geoRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a Server
app.listen(port, () => {
   console.log(`app is running at ${port}`);
});
