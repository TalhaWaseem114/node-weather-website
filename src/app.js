const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getWeather = require("./utils/getWeather");

const app = express();
const port = process.env.PORT || 3000;

// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// set handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "talha wasim",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "talha wasim",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is some helpful text",
    title: "help",
    name: "talha waseem",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "you must provide a search term!",
    });
  } else {
    getWeather(req.query.address, (error, data) => {
      if (error) {
        res.send({ error });
      } else {
        res.send({
          data,
          address: req.query.address,
        });
      }
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "you must provide a search term!",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "talha waseem",
  });
});

app.listen(port, () => {
  console.log("Server is running on port 3000" + port);
});
