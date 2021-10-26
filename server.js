const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const https = require("https");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/data", (req, res) => {
  const city = req.body.name;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1571708f850599f06bfad6fa144488f`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const cityData = JSON.parse(data);
      const icon = cityData.weather[0].icon;
      const description = cityData.weather[0].description;
      const temp = cityData.main.temp;
      const tempMin = cityData.main.temp_min;
      const tempMax = cityData.main.temp_max;
      const windSpeed = cityData.wind.speed;
      const humidity = cityData.main.humidity;
      res.render("index", {
        icon,
        description,
        name: city.toUpperCase(),
        temp,
        tempMin,
        tempMax,
        windSpeed,
        humidity,
      });
    });
  });
});

app.listen(PORT, () => {
  console.log("server is up and running");
});
