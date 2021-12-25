const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const https = require("https");
const cors = require("cors");

var privateKey = fs.readFileSync("sslcert/key.pem");
var certificate = fs.readFileSync("sslcert/cert.pem");

var credentials = { key: privateKey, cert: certificate };

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const Updater = require("./utils/EvenUpdator");
const u = new Updater(20000);
const DC = require("./utils/DataCala");

//Import Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to db")
);

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Route Middlewares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

u.init();
u.on("Event", function () {
  DC.process();
});
