$("#searchBtn").on("click", function() {
    // get the value of the input from user
    let city = $("#searchTerm").val();

    // clear input box
    $("#searchTerm").val("");

    // store api key
    var apiKey = "b89976505f101fd43fcfe841c78ca5c3";

    // full url to call api
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function (response){

        console.log(response.name)
        console.log(response.weather[0].icon)
        console.log(response.weather.main);

        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF))

        console.log(response.main.humidity)

        console.log(response.wind.speed)
        currentConditions(response)

    })
  });


  function currentConditions (response) {

    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    var cardBody = $("#current-city");
    var city = $("#cityName").text(response.name);
    var temp = $("#currentTemp").text("Temperature: " + tempF + " °F");
    var humid = $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("#currentWind").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")


    city.append(image)
    cardBody.append(city, temp, humid, wind);
    $("#currentCity").append(card);

  }
