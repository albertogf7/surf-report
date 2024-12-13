// Example: Using Open-Meteo Marine Weather API
const apiUrl =
  "https://marine-api.open-meteo.com/v1/marine?latitude=36.7783&longitude=-119.4179&hourly=wave_height,swell_height,tide_low,tide_high";

// Fetch surf data and display it
async function fetchSurfData() {
  const reportElement = document.getElementById("report");

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    // Parse JSON response
    const data = await response.json();

    // Validate the necessary fields in the response
    if (
      !data.hourly ||
      !data.hourly.wave_height ||
      !data.hourly.swell_height ||
      !data.hourly.tide_low ||
      !data.hourly.tide_high
    ) {
      throw new Error("Incomplete data received from the API.");
    }

    // Build the report content
    const report = `
        <h2>Surf Report</h2>
        <p><strong>Wave Height:</strong> ${data.hourly.wave_height[0]} meters</p>
        <p><strong>Swell Height:</strong> ${data.hourly.swell_height[0]} meters</p>
        <p><strong>Low Tide:</strong> ${data.hourly.tide_low[0]}</p>
        <p><strong>High Tide:</strong> ${data.hourly.tide_high[0]}</p>
    `;

    // Update the HTML content with the surf report
    reportElement.innerHTML = report;
  } catch (error) {
    // Handle errors and display a message
    reportElement.innerHTML = `
        <p style="color: red;">Error loading surf data: ${error.message}</p>
    `;
    console.error("Fetch Error:", error); // Log error details to the console for debugging
  }
}

// Call the function
fetchSurfData();