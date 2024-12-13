async function fetchSurfData() {
    const apiUrl = "https://marine-api.open-meteo.com/v1/marine?latitude=33.1959&longitude=-117.3795&hourly=wave_height";
  
    const reportElement = document.getElementById("report");

    const timeout = 10000; // Timeout after 10 seconds
  
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
  
      const response = await fetch(apiUrl, { signal: controller.signal });
  
      clearTimeout(timeoutId);  // Clear the timeout once call succeeds
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log("API response received:", data);
  
      if (data.hourly) {
        const waveHeight = parseFloat(data.hourly.wave_height?.[0]) || 0;
        const locationName = "Oceanside, CA";  // Location you want to display
        reportElement.innerHTML = `<p><strong>Location:</strong> ${locationName} meters</p>
                                   <p><strong>Wave Height:</strong> ${waveHeight} meters</p>`;
      }
    } catch (error) {
      console.error("API Error:", error.message);
      reportElement.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
  
  fetchSurfData();
  