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

//FOR AUTHENTICATION
const authRoutes = require("./routes/auth");
//FOR MEDICINE
const medicineRoutes = require("./routes/medicine");
const categoryRoutes = require("./routes/category");
const packageRoutes = require("./routes/package");
const rackRoutes = require("./routes/rack");
const packageTypeRoutes = require("./routes/packageType");
//FOR PURCHASE
const companiesRoutes = require("./routes/companies");
const purchaseRoutes = require("./routes/purchase");
const paymentRoutes = require("./routes/payment");
//FOR SALE
const saleRoutes = require("./routes/sale");
const customerRoutes = require("./routes/customer");

//DB Connection
mongoose
   .connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017/msm", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
   })
   .then(() => {
      console.log("DB CONNECTED");
   });

//Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(cors());
//app.use("/upload", express.static(path.join(__dirname, "public/upload")));

//Routes
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", packageRoutes);
app.use("/api", rackRoutes);
app.use("/api", medicineRoutes);
app.use("/api", packageTypeRoutes);
app.use("/api", companiesRoutes);
app.use("/api", purchaseRoutes);
app.use("/api", paymentRoutes);
app.use("/api", saleRoutes);
app.use("/api", customerRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a Server
app.listen(port, () => {
   console.log(`app is running at ${port}`);
});
