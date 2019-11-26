const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(morgan("dev"));