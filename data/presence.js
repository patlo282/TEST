const config = require('../config');
const { cmd } = require("../command");

/**
 * PresenceControl handles the bot's online/offline status
 * strictly based on ALWAYS_ONLINE config value.
 * 
 * If true  → Bot always appears online
 * If false → Bot always appears offline
 */
const PresenceControl = async (conn, update) => {
    try {
        const targetJid = update?.id;
        if (!targetJid) return;

        // Always Online
        if (config.ALWAYS_ONLINE === "true") {
            await conn.sendPresenceUpdate("available", targetJid);
            return;
        }

        // Always Offline
        if (config.ALWAYS_ONLINE === "false") {
            await conn.sendPresenceUpdate("unavailable", targetJid);
            return;
        }

    } catch (err) {
        console.error('[Presence Error]', err);
    }
};

// Optional dummy to prevent TypeError
const BotActivityFilter = (conn) => {
    console.log("✅ BotActivityFilter placeholder called");
};

module.exports = { PresenceControl, BotActivityFilter };
