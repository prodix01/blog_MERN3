const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const profilesRoute = require("./routes/profiles");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(morgan("dev"));

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/profiles", profilesRoute);

//모든 에러코드 500 은 err.message 를 보냄.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            msg : err.message
        }
    });
});

module.exports = app;