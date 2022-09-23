// Base URL for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=7002ef44000918473a71116248f103e3&units=metric";
// Creating the fullDate
const date = new Date();
const fullDate = `${date.getDate()}/${
  date.getMonth() + 1
}/${date.getFullYear()}`;

document.getElementById("generate").addEventListener("click", performAction);

function performAction() {
  const zipCode = document.getElementById("zip").value;
  getURL(baseURL, zipCode, apiKey);
}
const getURL = async (baseURL, zipCode, key) => {
  // The URL with the zipCode
  const res = await fetch(baseURL + zipCode + key);
  // Transform into JSON
  const data = await res.json();
  const feel = document.getElementById("feelings").value;
  // Send Data that we got back to store it in the server
  const response = await fetch("/addData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date: fullDate, temp: data.main.temp, feel }),
  });

  try {
    // Transform into JSON
    const newData = await response.json();
    return retrieveData();
  } catch (error) {
    console.log("error", error);
  }
};

const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML = `temperature: ${Math.round(
      allData.temp
    )} degrees`;
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
