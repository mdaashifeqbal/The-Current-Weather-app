const input = document.getElementById("input");
const button = document.getElementById("submitButon");
const tempratureDescription = document.querySelector(".tempdescription");
const temprature = document.querySelector("#temprature");
const humidity = document.querySelector("#humidityValue");
const wind = document.querySelector("#windValue");
const video = document.querySelector(".bg-video");
const image = document.querySelector(".image");
video.playbackRate = 0.3;
let emptyString = "";

function weatherCheck(city) {
  if (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"373eb9e0544645fb64be18262f3a0589"}`
    )
      .then((response) => {
        return response;
      })
      .then((responseObject) => {
        return responseObject.json();
      })
      .then((objectfromjson) => {
        temprature.innerHTML = `${Math.round(
          objectfromjson.main.temp - 273.15
        )}°C`;
        tempratureDescription.innerHTML = objectfromjson.weather[0].main;
        humidity.innerHTML = `${objectfromjson.main.humidity} %`;
        wind.innerHTML = `${objectfromjson.wind.speed} km/h`;

        switch (`${objectfromjson.weather[0].main}`) {
          case "Clouds": {
            image.src = `${"images/cloud.png"}`;
            break;
          }
          case "Clear": {
            image.src = `${"images/clear.png"}`;
            break;
          }
          case "Rain": {
            image.src = `${"images/rain.png"}`;
            break;
          }
          case "Mist": {
            image.src = `${"images/mist.png"}`;
            break;
          }
          case "Snow": {
            image.src = `${"images/snow.png"}`;
            break;
          }
        }
      });
  } else if (city == 0) {
    alert("city is invalid or not provided !");
   image.src = `${"images/404.png"}`;
    input.innerHTML = emptyString;
  }
}

button.addEventListener("click", () => {
  const query = input.value.trim();

  if (query === "") {
    alert("city is invalid or not provided !");
    image.src = `${"images/404.png"}`;
  } else {
    weatherCheck(input.value);
  }
});

document.addEventListener("keydown", (event) => {
  let key = event.key;

  if (key == "Enter") {
    weatherCheck(input.value);
  }
});
