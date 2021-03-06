const cors = require("cors");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const app = express();

require("dotenv").config();
require("./config/database");

const tripsRouter = require("./routes/api/trips");

app.use(cors());
// app.options("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));


// ---------------------API Routes Below -------------------
app.use("/api/trips", tripsRouter);
app.use("/api/users", require("./routes/api/users"));
app.use("/api/camps", require("./routes/api/camps"));
app.use(require("./config/auth"));



// -------------------- ALL CODE ABOVE ---------------------
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log(`Express app running on port ${port}`)
});