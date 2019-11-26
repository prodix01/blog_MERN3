const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const profilesRoute = require("./routes/profiles");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(morgan("dev"));

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/profiles", profilesRoute);

module.exports = app;