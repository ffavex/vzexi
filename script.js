document.addEventListener("DOMContentLoaded", () => {
  const statusDot = document.getElementById("status-dot")
  const statusText = document.getElementById("status-text")

  // Default status texts
  const statusTexts = {
    termed: "Account Termed",
    new: "New Account: @assetseized",
    limited: "Account Limited",
  }

  // Mock config object (replace with actual config loading)
  const config = {
    accountStatus: "new", // Default status
    customStatusText: null, // Optional custom text
  }

  // Apply status based on config
  function applyStatus() {
    // Remove all existing status classes
    statusDot.classList.remove("termed", "new", "limited")

    // Add the appropriate class based on config
    if (config.accountStatus in statusTexts) {
      statusDot.classList.add(config.accountStatus)

      // Set status text (use custom text if provided, otherwise use default)
      statusText.textContent = config.customStatusText || statusTexts[config.accountStatus]
    } else {
      // Fallback for invalid status
      statusText.textContent = "Unknown Status"
    }
  }

  // Initial application of status
  applyStatus()

  // For demonstration purposes, you can uncomment this to cycle through statuses
  /*
    let statusCycle = ["termed", "new", "limited"];
    let currentIndex = 0;

    setInterval(() => {
        config.accountStatus = statusCycle[currentIndex];
        currentIndex = (currentIndex + 1) % statusCycle.length;
        applyStatus();
    }, 3000);
    */
})
