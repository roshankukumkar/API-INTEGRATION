async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = "Loading...";

  if (!city) {
    weatherResult.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    // Use free API: wttr.in - no key required
    const response = await fetch(`https://wttr.in/${city}?format=j1`);

    if (!response.ok) {
      throw new Error("City not found or API error");
    }

    const data = await response.json();

    // Extract current condition and temp in Celsius
    const current = data.current_condition[0];
    weatherResult.innerHTML = `
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Temperature:</strong> ${current.temp_C} °C</p>
      <p><strong>Weather:</strong> ${current.weatherDesc[0].value}</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}
