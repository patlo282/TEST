const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    alias: ["creator"],
    desc: "Show bot owner's contact",
    category: "main",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${config.OWNER_NAME}\nTEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER}:${config.OWNER_NUMBER}\nEND:VCARD`;

        await conn.sendMessage(from, { 
            contacts: { 
                displayName: config.OWNER_NAME, 
                contacts: [{ vcard }] 
            } 
        }, { quoted: mek });

    } catch (e) {
        console.log("OWNER CMD Error: ", e);
    }
});
