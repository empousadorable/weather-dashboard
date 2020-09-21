let city = $("#searchTerm").val();
var apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

var date = new Date();

$("#searchBtn").on("click", function () {
  city = $("#searchTerm").val();

  $("#searchTerm").val("");

  var queryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    console.log(response.name);
    console.log(response.weather[0].icon);

    let tempF = (response.main.temp - 273.15) * 1.8 + 32;
    console.log(Math.floor(tempF));

    console.log(response.main.humidity);

    console.log(response.wind.speed);

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();
  });
});

function makeList() {
  let listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}

function getCurrentConditions(response) {
  let tempF = (response.main.temp - 273.15) * 1.8 + 32;
  tempF = Math.floor(tempF);

  $("#currentCity").empty();

  var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
  var cardBody = $("<div>").addClass("card-body p-3 forecastBody");
  var city = $("<h4>").addClass("card-title").text(response.name);
  var cityDate = $("<h4>")
    .addClass("card-title")
    .text(date.toLocaleDateString("en-US"));
  var temperature = $("<p>")
    .addClass("card-text current-temp")
    .text("Temperature: " + tempF + " °F");
  var humidity = $("<p>")
    .addClass("card-text current-humidity")
    .text("Humidity: " + response.main.humidity + "%");
  var wind = $("<p>")
    .addClass("card-text current-wind")
    .text("Wind Speed: " + response.wind.speed + " MPH");
  var image = $("<img>").attr(
    "src",
    "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
  );

  city.append(cityDate, image);
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}

function getCurrentForecast(response) {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#forecast").empty();

    let results = response.list;

    for (let i = 0; i < results.length; i++) {
      let temp = (results[i].main.temp - 273.15) * 1.8 + 32;
      let tempF = Math.floor(temp);

      var card = $("<div>").addClass(
        "card col-md-4 ml-2 bg-primary text-white"
      );
      var cardBody = $("<div>").addClass("card-body p-3 forecastBody");
      var cityDate = $("<h4>")
        .addClass("card-title")
        .text(date.toLocaleDateString("en-US"));
      var temperature = $("<p>")
        .addClass("card-text forecastTemp")
        .text("Temperature: " + tempF + " °F");
      var humidity = $("<p>")
        .addClass("card-text forecastHumidity")
        .text("Humidity: " + results[i].main.humidity + "%");

      var image = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png"
      );

      cardBody.append(cityDate, image, temperature, humidity);
      card.append(cardBody);
      $("#forecast").append(card);
    }
  });
}
