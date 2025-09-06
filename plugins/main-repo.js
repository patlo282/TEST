const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script"],
    desc: "Show bot GitHub repository information.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Static repo information
        const formattedInfo = `*BOT NAME:*\n> SHABAN-MD\n\n*OWNER NAME:*\n> MRSHABAN45\n\n*STARS:*\n> ⭐ Keep Supporting\n\n*FORKS:*\n> 🍴 Don't Forget\n\n*GITHUB LINK:*\n> https://github.com/MRSHABAN45/SHABAN-MD\n\n*DESCRIPTION:*\n> Best WhatsApp Bot with Powerful Features.\n\n*Don't Forget To Star and Fork Repository*\n\n> *© Poᴡᴇʀᴇᴅ Bʏ Mʀ Sʜᴀʙᴀɴ*`;

        // Send image + caption
        await conn.sendMessage(from, {
            image: { url: "https://ik.imagekit.io/mrshaban/Picsart_25-02-01_22-47-44-239.jpg" },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363358310754973@newsletter',
                    newsletterName: 'SʜᴀʙᴀɴMᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("❌ Error showing repository info. Try again later.");
    }
});