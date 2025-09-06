const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

function isEnabled(value) {
    // Function to check if a value represents a "true" boolean state
    return value && value.toString().toLowerCase() === "true";
}

cmd({
    pattern: "env",
    alias: ["settings", "allvar"],
    desc: "Displays bot settings",
    category: "menu",
    react: "⚙️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Royal & Stylish Settings Message
        let envSettings = `*⚙️SHABAN-MD SETTINGS⚙️*

┣ 🔹 *statusview* ${isEnabled(config.AUTO_STATUS_SEEN) ? "On" : "Off"}  
┣ 🔹 *statusreply* ${isEnabled(config.AUTO_STATUS_REPLY) ? "On" : "Off"}  
┣ 🔹 *autoreply* ${isEnabled(config.AUTO_REPLY) ? "On" : "Off"}  
┣ 🔹 *autosticker* ${isEnabled(config.AUTO_STICKER) ? "On" : "Off"}  
┣ 🔹 *autovoice* ${isEnabled(config.AUTO_VOICE) ? "On" : "Off"}  
┣ 🔹 *heartreact* ${isEnabled(config.CUSTOM_REACT) ? "On" : "Off"}  
┣ 🔹 *autoreact* ${isEnabled(config.AUTO_REACT) ? "On" : "Off"}  
┣ 🔹 *Delete Links* ${isEnabled(config.DELETE_LINKS) ? "On" : "Off"}  
┣ 🔹 *antilink* ${isEnabled(config.ANTI_LINK) ? "On" : "Off"}  
┣ 🔹 *antibad* ${isEnabled(config.ANTI_BAD) ? "On" : "Off"}  
┣ 🔹 *autotyping* ${isEnabled(config.AUTO_TYPING) ? "On" : "Off"}  
┣ 🔹 *autoreacording* ${isEnabled(config.AUTO_RECORDING) ? "On" : "Off"}  
┣ 🔹 *alwaysonline* ${isEnabled(config.ALWAYS_ONLINE) ? "On" : "Off"}  
┣ 🔹 *mode* ${isEnabled(config.PUBLIC_MODE) ? "On" : "Off"}  
┣ 🔹 *readmessage* ${isEnabled(config.READ_MESSAGE) ? "On" : "Off"}  
┣ 🔹 *statusreact* ${isEnabled(config.AUTO_STATUS_REACT) ? "On" : "Off"}  
┣ 🔹 *welcome* ${isEnabled(config.WELCOME) ? "On" : "Off"}  
┣ 🔹 *adminevents* ${isEnabled(config.ADMIN_EVENTS) ? "On" : "Off"}  
┃  
┗━━━━━━━━━━━━━━━━━ 
📝 *Description:* ${config.DESCRIPTION}`;

        // Send stylish image
        await conn.sendMessage(
            from,
            {
                image: { url: 'https://ik.imagekit.io/mrshaban/Picsart_25-01-22_17-12-30-236.jpg' }, // Stylish Image
                caption: envSettings,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363358310754973@newsletter',
                        newsletterName: "SʜᴀʙᴀɴMᴅ",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (error) {
        console.log(error);
        reply(`❌ *Error:* ${error.message}`);
    }
});