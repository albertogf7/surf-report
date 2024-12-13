// Customize the API call
const apiUrl = "https://marine-api.open-meteo.com/v1/marine?latitude=33.1959&longitude=-117.3795&hourly=wave_height,swell_height,tide_low,tide_high";

async function fetchSurfData() {
  const reportElement = document.getElementById("report");

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Data:", data); // Debugging output

    if (
      !data.hourly ||
      !data.hourly.wave_height ||
      !data.hourly.swell_height ||
      !data.hourly.tide_low ||
      !data.hourly.tide_high
    ) {
      throw new Error("Incomplete data received from the API.");
    }

    const report = `
        <h2>Surf Report for Oceanside, CA</h2>
        <p><strong>Wave Height:</strong> ${data.hourly.wave_height[0]} meters</p>
        <p><strong>Swell Height:</strong> ${data.hourly.swell_height[0]} meters</p>
        <p><strong>Low Tide:</strong> ${data.hourly.tide_low[0]}</p>
        <p><strong>High Tide:</strong> ${data.hourly.tide_high[0]}</p>
    `;

    reportElement.innerHTML = report;
  } catch (error) {
    reportElement.innerHTML = `
        <p style="color: red;">Error: ${error.message}</p>
    `;
    console.error("Fetch Error:", error);
  }
}

// Call the function
fetchSurfData();